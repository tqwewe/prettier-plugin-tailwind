import type TWClassesSorter from 'tailwind-classes-sorter'
import groupNamesSorter from '../utils/group-names-sorter'

const TW_MARCO_EXP = /(?:[A-z\-]+:)*\([^\)]*\)/g
const TW_MARCO_GROUP_NAMES_EXP = /([A-z\-]+:)/g
const TW_MARCO_GROUP_CONTENT_EXP = /[A-z\-]+:\(([^\)]*)\)/

// Formats Twin macro
//   eg: `tw\`container w-full sm:(w-1/2)\``

export default function twin(twClassesSorter: TWClassesSorter, node: any) {
	if (
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
				groups.sort(groupNamesSorter<{ names: string[] }>(val => val.names[0]))

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
}
