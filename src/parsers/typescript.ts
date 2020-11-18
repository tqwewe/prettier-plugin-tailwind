import TWClassesSorter from 'tailwind-classes-sorter'
import prettierParserTypescript from 'prettier/parser-typescript'
import loopNodes from '../utils/loop-nodes'
import groupNamesSorter from '../utils/group-names-sorter'
import updateOptions from '../utils/update-options'

const TW_MARCO_EXP = /(?:[A-z\-]+:)*\([^\)]*\)/g
const TW_MARCO_GROUP_NAMES_EXP = /([A-z\-]+:)/g
const TW_MARCO_GROUP_CONTENT_EXP = /[A-z\-]+:\(([^\)]*)\)/

export default (twClassesSorter: TWClassesSorter) => ({
	...prettierParserTypescript.parsers.typescript,
	parse(text, parsers, options) {
		const ast = prettierParserTypescript.parsers.typescript.parse(
			text,
			parsers,
			options
		)

		if (!twClassesSorter) {
			return ast
		}

		updateOptions(twClassesSorter, options)

		const attributeNames: string[] = options.twJsxClassAttributes.split(',')

		const result = loopNodes(ast, node => {
			if (
				node &&
				node.type === 'JSXAttribute' &&
				node.name &&
				node.name.type === 'JSXIdentifier' &&
				attributeNames.includes(node.name.name) &&
				node.value &&
				(node.value.type === 'StringLiteral' || node.value.type === 'Literal')
			) {
				const newValue = twClassesSorter
					.sortClasslist(node.value.value)
					.join(' ')
				node.value.value = newValue
				node.value.extra = {
					...(node.value.extra || {}),
					rawValue: newValue,
					raw: `"${newValue}"`,
				}
			} else if (
				node &&
				node.type === 'TaggedTemplateExpression' &&
				node.tag &&
				node.tag.name === 'tw' &&
				node.quasi &&
				Array.isArray(node.quasi.quasis)
			) {
				node.quasi.quasis.forEach(q => {
					if (q.value && q.value.raw) {
						const rawValue = q.value.raw

						const groups: {
							names: string[]
							content: string
						}[] = []
						const normalClasses = twClassesSorter
							.sortClasslist(
								rawValue.replace(TW_MARCO_EXP, str => {
									const groupNames = str
										.match(TW_MARCO_GROUP_NAMES_EXP)
										.map(groupName => groupName.substr(0, groupName.length - 1))
										.sort(groupNamesSorter())

									const content = twClassesSorter
										.sortClasslist(str.match(TW_MARCO_GROUP_CONTENT_EXP)[1])
										.join(' ')

									groups.push({
										names: groupNames,
										content,
									})
									return ''
								})
							)
							.join(' ')

						// Sort groups
						groups.sort(
							groupNamesSorter<{ names: string[] }>(val => val.names[0])
						)

						const finalStr = `${normalClasses} ${groups
							.map(({ names, content }) => `${names.join(':')}:(${content})`)
							.join(' ')}`.trim()

						q.value.raw = finalStr
						if (q.value.cooked) {
							q.value.cooked = finalStr
						}
					}
				})
			}
			return node
		})

		return result
	},
})
