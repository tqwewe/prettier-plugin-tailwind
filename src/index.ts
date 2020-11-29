import TWClassesSorter from 'tailwind-classes-sorter'
import path from 'path'
import languages from './languages'
import parsers from './parsers'
import printers from './printers'
import options from './options'

const twClassesSorter = new TWClassesSorter({
	nodeModulesPath: path.join(__dirname, '../../../node_modules'),
})

module.exports = {
	languages: languages.svelte,
	parsers: parsers(twClassesSorter),
	printers: printers.svelte,
	options,
}
