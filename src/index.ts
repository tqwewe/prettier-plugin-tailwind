import TWClassesSorter from 'tailwind-classes-sorter'
import path from 'path'
import parsers from './parsers'
import options from './options'

let twClassesSorter
try {
	twClassesSorter = new TWClassesSorter({
		nodeModulesPath: path.join(__dirname, '../../../node_modules'),
	})
} catch (err) {
	console.warn('no tailwind.config.js file found', err)
}

module.exports = {
	parsers: parsers(twClassesSorter),
	options,
}
