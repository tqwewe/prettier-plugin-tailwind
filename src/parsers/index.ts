import type TWClassesSorter from 'tailwind-classes-sorter'
import html from './html'
import babel from './babel'
import typescript from './typescript'

export default (twClassesSorter: TWClassesSorter) => ({
	html: html(twClassesSorter),
	babel: babel(twClassesSorter),
	typescript: typescript(twClassesSorter),
	// 'babel-ts': babelTs(twClassesSorter),
})
