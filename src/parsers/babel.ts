import type TWClassesSorter from 'tailwind-classes-sorter'
import prettierParserBabel from 'prettier/parser-babel'
import loopNodes from '../utils/loop-nodes'

export default (twClassesSorter: TWClassesSorter) => ({
	...prettierParserBabel.parsers.babel,
	parse: (text, parsers, options) => {
		const ast = prettierParserBabel.parsers.babel.parse(text, parsers, options)

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
			}
			return node
		})

		return result
	},
})
