import type TWClassesSorter from 'tailwind-classes-sorter'
import * as sveltePrettierPlugin from 'svelte-prettier-plugin'
import loopNodes from '../utils/loop-nodes'
import updateOptions from '../utils/update-options'

export default (twClassesSorter: TWClassesSorter) => ({
	...sveltePrettierPlugin.parsers.svelte,
	parse(text, parsers, options) {
		const ast = sveltePrettierPlugin.parsers.svelte.parse(
			text,
			parsers,
			options
		)

		if (!twClassesSorter) {
			return ast
		}

		updateOptions(twClassesSorter, options)

		const result = loopNodes(ast, node => {
			if (
				node &&
				node.type === 'Attribute' &&
				node.name === 'class' &&
				node.value &&
				node.value.length > 0
			) {
				node.value = node.value.map((nodeValue, index, arr) => {
					if (nodeValue.type !== 'Text') {
						return nodeValue
					}

					const trim = !arr.some(nodeValue2 => nodeValue2.type !== 'Text')
					const spacesBefore = trim
						? 0
						: nodeValue.raw.length - nodeValue.raw.trimStart().length
					const spacesAfter = trim
						? 0
						: nodeValue.raw.length - nodeValue.raw.trimEnd().length

					const newValue = `${' '.repeat(
						spacesBefore
					)}${twClassesSorter
						.sortClasslist(nodeValue.raw)
						.join(' ')}${' '.repeat(spacesAfter)}`

					return { ...nodeValue, raw: newValue, data: newValue }
				})
			}

			return node
		})

		return result
	},
})
