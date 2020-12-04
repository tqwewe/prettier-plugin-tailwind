import type TWClassesSorter from 'tailwind-classes-sorter'
import prettierParserBabel from 'prettier/parser-babel'
import loopNodes from '../utils/loop-nodes'
import updateOptions from '../utils/update-options'
import jsxAttributes from '../node-formatters/jsx-attributes'
import functionCalls from '../node-formatters/function-calls'
import functionTemplates from '../node-formatters/function-templates'

export default (twClassesSorter: TWClassesSorter) => ({
	...prettierParserBabel.parsers.babel,
	parse(text, parsers, options) {
		const ast = prettierParserBabel.parsers.babel.parse(text, parsers, options)

		if (!twClassesSorter) {
			return ast
		}

		updateOptions(twClassesSorter, options)

		const attributeNames: string[] = options.twJsxClassAttributes.split(',')
		const functionNames: string[] = options.twSortFunctions.split(',')

		const result = loopNodes(ast, node => {
			jsxAttributes(twClassesSorter, node, attributeNames)
			functionCalls(twClassesSorter, node, functionNames)
			functionTemplates(twClassesSorter, node, functionNames)

			return node
		})

		return result
	},
})
