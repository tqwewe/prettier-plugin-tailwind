import type TWClassesSorter from 'tailwind-classes-sorter'
import prettierParserHTML from 'prettier/parser-html'

export default (twClassesSorter: TWClassesSorter) => ({
	...prettierParserHTML.parsers.html,
	parse: (text, parsers, options) => {
		const result = prettierParserHTML.parsers.html.parse(text, parsers, options)
		if (!twClassesSorter) {
			return result
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
		cleanElementClasses(result)

		return result
	},
})
