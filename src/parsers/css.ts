import type TWClassesSorter from 'tailwind-classes-sorter'
import prettierParserPostCSS from 'prettier/parser-postcss'
import loopNodes from '../utils/loop-nodes'
import updateOptions from '../utils/update-options'

export default (twClassesSorter: TWClassesSorter) => ({
	...prettierParserPostCSS.parsers.css,
	parse(text, parsers, options) {
		const ast = prettierParserPostCSS.parsers.css.parse(text, parsers, options)

		if (!twClassesSorter) {
			return ast
		}

		updateOptions(twClassesSorter, options)

		const result = loopNodes(ast, node => {
			if (
				node &&
				node.type === 'css-atrule' &&
				node.name === 'apply' &&
				node.params
			) {
				const newValue = twClassesSorter.sortClasslist(node.params).join(' ')

				node.params = newValue
			}

			return node
		})

		return result
	},
})
