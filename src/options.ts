export default {
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
	twJsxClassAttributes: {
		type: 'string',
		category: 'Global',
		default: 'className,tw',
		description:
			'Comma separated list of JSX attributes to sort tailwind classes in.',
	},
}
