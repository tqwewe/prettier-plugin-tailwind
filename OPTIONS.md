# Prettier Options

These options can be set in your `.prettierrc` file to change the behavious of this plugin.

- [**`twConfig`**](#twconfig) - Path to tailwind config relative to the root of the project.
- [**`twPluginsOrder`**](#twpluginsorder) - Comma separated order of tailwind plugins to sort classes by.
- [**`twClassesPosition`**](#twclassesposition) - Position of component and utility classes.
- [**`twUnknownClassesPosition`**](#twunknownclassesposition) - Position of unknown classes.
- [**`twJsxClassAttributes`**](#twjsxclassattributes) - Comma separated list of JSX attributes to sort tailwind classes in.
- [**`twSortFunctions`**](#twsortfunctions) - Comma separated list of function names to sort classes in arguments.

### twConfig

Path to tailwind config relative to the root of the project; "" will attempt to find a tailwind.config.js file recursively.

```ts
twConfig: string
```

_Default: `""`_

### twPluginsOrder

Comma separated order of tailwind plugins to sort classes by.
`""` will use the plugins in alphabetical order.

```ts
twPluginsOrder: string
```

_Default: `"container,position,zIndex,inset,display,flex,flexDirection,flexGrow,flexShrink,flexWrap,gap,gridAutoFlow,gridColumn,gridColumnEnd,gridColumnStart,gridRow,gridRowEnd,gridRowStart,gridTemplateColumns,gridTemplateRows,alignContent,alignItems,alignSelf,justifyContent,justifyItems,justifySelf,verticalAlign,placeContent,placeItems,placeSelf,float,clear,order,tableLayout,margin,padding,width,minWidth,maxWidth,height,maxHeight,minHeight,textAlign,textColor,textDecoration,textOpacity,wordBreak,whitespace,fontFamily,fontSize,fontSmoothing,fontStyle,fontVariantNumeric,fontWeight,letterSpacing,lineHeight,backgroundColor,backgroundImage,backgroundSize,backgroundPosition,backgroundRepeat,backgroundAttachment,backgroundClip,backgroundOpacity,borderWidth,borderStyle,borderColor,borderOpacity,borderRadius,borderCollapse,placeholderColor,placeholderOpacity,outline,fill,stroke,strokeWidth,boxShadow,gradientColorStops,opacity,visibility,accessibility,appearance,boxSizing,cursor,pointerEvents,userSelect,divideColor,divideOpacity,divideStyle,divideWidth,listStylePosition,listStyleType,objectFit,objectPosition,overflow,overscrollBehavior,transform,transformOrigin,translate,textTransform,resize,rotate,scale,skew,space,animation,transitionProperty,transitionDuration,transitionDelay,transitionTimingFunction,preflight"`_

_Example: `"container,position,inset"`_

### twClassesPosition

Position of component and utility classes. `"as-is"` will allow component classes to be placed between utility classes.

```ts
twClassesPosition: 'components-first' | 'components-last' | 'as-is'
```

_Default: `"components-first"`_

### twUnknownClassesPosition

Position of unknown classes.

```ts
twUnknownClassesPosition: 'start' | 'end'
```

_Default: `"start"`_

### twJsxClassAttributes

Comma separated list of JSX attributes to sort tailwind classes in.

```ts
twJsxClassAttributes: string
```

_Default: `"class,className,tw"`_

### twSortFunctions

Comma separated list of function names to sort classes in arguments.

```ts
twSortFunctions: string
```

_Default: `"clsx,classNames,cx"`_
