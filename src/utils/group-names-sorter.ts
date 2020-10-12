const TW_MARCO_GROUP_ORDER = [
	'sm',
	'md',
	'lg',
	'xl',
	'hover',
	'focus',
	'active',
	'group-hover',
	'group-focus',
	'focus-within',
	'focus-visible',
	'motion-safe',
	'motion-reduce',
	'disabled',
	'visited',
	'checked',
	'first',
	'last',
	'odd',
	'even',
]

export default function groupNamesSorter<T>(
	getName: (val: T) => string = val => (val as unknown) as string
) {
	return (a, b) => {
		const nameA = getName(a)
		const nameB = getName(b)
		const aSortIndex = TW_MARCO_GROUP_ORDER.findIndex(name => name === nameA)
		const bSortIndex = TW_MARCO_GROUP_ORDER.findIndex(name => name === nameB)

		if (aSortIndex !== -1 && bSortIndex === -1) {
			// a found, b not found
			return 1
		}
		if (aSortIndex === -1 && bSortIndex !== -1) {
			// b found, a not found
			return -1
		}

		if (aSortIndex !== -1 && bSortIndex !== -1) {
			if (aSortIndex < bSortIndex) {
				return -1
			}
			if (aSortIndex > bSortIndex) {
				return 1
			}

			return 0
		}

		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}

		return 0
	}
}
