import type TWClassesSorter from 'tailwind-classes-sorter'

// Formats function templates
//   eg: `clsx\`container w-full\``

export default function functionTemplates(
	twClassesSorter: TWClassesSorter,
	node: any,
	functionNames: string[]
) {
	if (
		node &&
		node.type === 'TaggedTemplateExpression' &&
		node.tag &&
		node.tag.type === 'Identifier' &&
		functionNames.some(functionName => functionName === node.tag.name) &&
		node.quasi &&
		node.quasi.type === 'TemplateLiteral' &&
		node.quasi.quasis
	) {
		node.quasi.quasis.forEach(quasi => {
			if (quasi.type !== 'TemplateElement' || !quasi.value) {
				return
			}

			const spacesBefore =
				quasi.value.raw.length - quasi.value.raw.trimStart().length
			const spacesAfter =
				quasi.value.raw.length - quasi.value.raw.trimEnd().length

			const newValue = `${' '.repeat(
				spacesBefore
			)}${twClassesSorter.sortClasslist(quasi.value.raw).join(' ')}${' '.repeat(
				spacesAfter
			)}`

			quasi.value = {
				...quasi.value,
				raw: newValue,
				cooked: newValue,
			}
		})
	}

	return node
}
