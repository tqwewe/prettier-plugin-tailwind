const prettierParserHTML = require('prettier/parser-html')
const TWClassesSorter = require('tailwind-classes-sorter').default
const path = require('path')

let twClassesSorter
try {
	twClassesSorter = new TWClassesSorter({
		nodeModulesPath: path.join(__dirname, '../../node_modules'),
	})
} catch (err) {
	console.warn('no tailwind.config.js file found', err)
}

const options = {
	twPluginsOrder: {
		type: 'string',
		category: 'Global',
		default: '',
		description:
			'Comma separated order of tailwind plugins to sort classes by; "" will use the default order.',
	},
	twClassesPosition: {
		type: 'string',
		category: 'Global',
		default: 'components-first',
		description:
			'Position of component and utility classes; "components-first" | "components-last" | "as-is"',
	},
	twUnknownClassesPosition: {
		type: 'string',
		category: 'Global',
		default: 'start',
		description: 'Position of unknown classes; "start" | "end"',
	},
}

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
		...prettierParserHTML.parsers.html,
		parse: (text, parsers, options) => {
			const result = prettierParserHTML.parsers.html.parse(
				text,
				parsers,
				options
			)
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
						classAttr.value = twClassesSorter
							.sortClasslist(classList, options.twUnknownClassesPosition)
							.join(' ')
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
	options,
}
