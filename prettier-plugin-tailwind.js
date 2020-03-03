const prettierParserHTML = require('prettier/parser-html')
const TWClassesSorter = require('tailwind-classes-sorter').default

const twClassesSorter = new TWClassesSorter()

const languages = [
	// {
	// 	name: 'JSX',
	// 	parsers: ['babel', 'flow'],
	// },
	// {
	// 	name: 'TSX',
	// 	parsers: ['typescript'],
	// },
	{
		name: 'HTML',
		parsers: ['html'],
	},
	// {
	// 	name: 'Vue',
	// 	parsers: ['vue'],
	// },
]

const parsers = {
	html: {
		...prettierParserHTML.default.parsers.html,
		parse: (text, parsers, options) => {
			const result = prettierParserHTML.default.parsers.html.parse(
				text,
				parsers,
				options
			)
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
	},
}

module.exports = {
	languages,
	parsers,
}
