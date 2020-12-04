import { options as svelteOptions } from 'svelte-prettier-plugin'

export default {
	...svelteOptions,
	twConfig: {
		type: 'string',
		category: 'Global',
		default: './tailwind.config.js',
		description: 'Path to tailwind config relative to the root of the project.',
	},
	twPluginsOrder: {
		type: 'string',
		category: 'Global',
		default:
			'container,position,zIndex,inset,display,flex,flexDirection,flexGrow,flexShrink,flexWrap,gap,gridAutoFlow,gridColumn,gridColumnEnd,gridColumnStart,gridRow,gridRowEnd,gridRowStart,gridTemplateColumns,gridTemplateRows,alignContent,alignItems,alignSelf,justifyContent,justifyItems,justifySelf,verticalAlign,placeContent,placeItems,placeSelf,float,clear,order,tableLayout,margin,padding,width,minWidth,maxWidth,height,maxHeight,minHeight,textAlign,textColor,textDecoration,textOpacity,wordBreak,whitespace,fontFamily,fontSize,fontSmoothing,fontStyle,fontVariantNumeric,fontWeight,letterSpacing,lineHeight,backgroundColor,backgroundImage,backgroundSize,backgroundPosition,backgroundRepeat,backgroundAttachment,backgroundClip,backgroundOpacity,borderWidth,borderStyle,borderColor,borderOpacity,borderRadius,borderCollapse,placeholderColor,placeholderOpacity,outline,fill,stroke,strokeWidth,boxShadow,gradientColorStops,opacity,visibility,accessibility,appearance,boxSizing,cursor,pointerEvents,userSelect,divideColor,divideOpacity,divideStyle,divideWidth,listStylePosition,listStyleType,objectFit,objectPosition,overflow,overscrollBehavior,transform,transformOrigin,translate,textTransform,resize,rotate,scale,skew,space,animation,transitionProperty,transitionDuration,transitionDelay,transitionTimingFunction,preflight',
		description:
			'Comma separated order of tailwind plugins to sort classes by; "" will use the plugins in alphabetical order.',
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
