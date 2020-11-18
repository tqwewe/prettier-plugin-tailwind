import type TWClassesSorter from 'tailwind-classes-sorter'
import prettierParserHTML from 'prettier/parser-html'
import updateOptions from '../utils/update-options'

export default (twClassesSorter: TWClassesSorter) => ({
	...prettierParserHTML.parsers.html,
	parse(text, parsers, options) {
		const ast = prettierParserHTML.parsers.html.parse(text, parsers, options)

		if (!twClassesSorter) {
			return ast
		}

		updateOptions(twClassesSorter, options)

		const cleanElementClasses = el => {
			if (el.attrs) {
				const classAttr = el.attrs.find(attr => attr.name === 'class')
				if (classAttr) {
					const classList = classAttr.value
						.split(' ')
						.map(classItem => classItem.trim())
						.filter(classItem => classItem.length > 0)
					classAttr.value = twClassesSorter.sortClasslist(classList).join(' ')
				}
			}

			if (el.children && el.children.length > 0) {
				el.children.forEach(childEl => cleanElementClasses(childEl))
			}
		}
		cleanElementClasses(ast)

		return ast
	},
})
