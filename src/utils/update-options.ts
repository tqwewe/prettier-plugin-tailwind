import type TWClassesSorter from 'tailwind-classes-sorter'
import path from 'path'

export default function updateOptions(
	twClassesSorter: TWClassesSorter,
	options: any
) {
	if (typeof options === 'undefined') {
		return
	}

	twClassesSorter.classesPosition =
		options.twClassesPosition || 'components-first'
	twClassesSorter.unknownClassesPosition =
		options.twUnknownClassesPosition || 'start'
	if (options.twConfig) {
		twClassesSorter.setConfig(
			path.join(__dirname, '../../../..', options.twConfig)
		)
	} else {
		twClassesSorter.setConfig()
	}
	twClassesSorter.setPluginOrder(defaultOrder => {
		const customOrder = options.twPluginsOrder.split(',')
		return [
			...customOrder,
			...defaultOrder.filter(plugin => !customOrder.includes(plugin)),
		]
	})
}
