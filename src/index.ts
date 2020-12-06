import TWClassesSorter from 'tailwind-classes-sorter'
import path from 'path'
import parsers from './parsers'
import options from './options'

const twClassesSorter = new TWClassesSorter({
	nodeModulesPath: path.join(__dirname, '../../../node_modules'),
})

module.exports = {
	parsers: parsers(twClassesSorter),
	options,
}
