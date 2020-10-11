import TWClassesSorter from 'tailwind-classes-sorter'
import prettierParserTypescript from 'prettier/parser-typescript'
import loopNodes from '../utils/loop-nodes'

const TW_MARCO_EXP = /(([A-z\-]+):\(([^\)]*)\))/g
const TW_MARCO_GROUP_ORDER = [
	'sm',
	'md',
	'lg',
	'xl',
	'hover',
	'focus',
	'active',
	'group-hover',
	'group-focus',
	'focus-within',
	'focus-visible',
	'motion-safe',
	'motion-reduce',
	'disabled',
	'visited',
	'checked',
	'first',
	'last',
	'odd',
	'even',
]

export default (twClassesSorter: TWClassesSorter) => ({
	...prettierParserTypescript.parsers.typescript,
	parse: (text, parsers, options) => {
		const ast = prettierParserTypescript.parsers.typescript.parse(
			text,
			parsers,
			options
		)

		if (!twClassesSorter) {
			return ast
		}
		twClassesSorter.classesPosition =
			options.twClassesPosition || 'components-first'
		twClassesSorter.unknownClassesPosition =
			options.twUnknownClassesPosition || 'start'
		twClassesSorter.setPluginOrder(defaultOrder => {
			const customOrder = options.twPluginsOrder.split(',')
			return [
				...customOrder,
				...defaultOrder.filter(plugin => !customOrder.includes(plugin)),
			]
		})

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
							name: string
							content: string
						}[] = []
						const normalClasses = twClassesSorter
							.sortClasslist(
								rawValue.replace(TW_MARCO_EXP, (_1, _2, groupName, classes) => {
									groups.push({
										name: groupName,
										content: twClassesSorter.sortClasslist(classes).join(' '),
									})
									return ''
								})
							)
							.join(' ')

						// Sort groups
						groups.sort((a, b) => {
							const aSortIndex = TW_MARCO_GROUP_ORDER.findIndex(
								name => name === a.name
							)
							const bSortIndex = TW_MARCO_GROUP_ORDER.findIndex(
								name => name === b.name
							)

							if (aSortIndex !== -1 && bSortIndex === -1) {
								// a found, b not found
								return 1
							}
							if (aSortIndex === -1 && bSortIndex !== -1) {
								// b found, a not found
								return -1
							}

							if (aSortIndex !== -1 && bSortIndex !== -1) {
								if (aSortIndex < bSortIndex) {
									return -1
								}
								if (aSortIndex > bSortIndex) {
									return 1
								}

								return 0
							}

							if (a.name < b.name) {
								return -1
							}
							if (a.name > b.name) {
								return 1
							}

							return 0
						})

						const finalStr = `${normalClasses} ${groups
							.map(({ name, content }) => `${name}:(${content})`)
							.join(' ')}`

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
