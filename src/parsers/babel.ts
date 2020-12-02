import type TWClassesSorter from 'tailwind-classes-sorter'
import prettierParserBabel from 'prettier/parser-babel'
import loopNodes from '../utils/loop-nodes'
import updateOptions from '../utils/update-options'

export default (twClassesSorter: TWClassesSorter) => ({
	...prettierParserBabel.parsers.babel,
	parse(text, parsers, options) {
		const ast = prettierParserBabel.parsers.babel.parse(text, parsers, options)

		if (!twClassesSorter) {
			return ast
		}

		updateOptions(twClassesSorter, options)

		const attributeNames: string[] =
			typeof options !== 'undefined'
				? options.twJsxClassAttributes.split(',')
				: ['class', 'className', 'tw']

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
			}
			return node
		})

		return result
	},
})
