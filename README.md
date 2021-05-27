[![npm version](https://badge.fury.io/js/prettier-plugin-tailwind.svg)](https://badge.fury.io/js/prettier-plugin-tailwind)

<p align="center">
  <img src="https://raw.githubusercontent.com/Acidic9/prettier-plugin-tailwind/master/banner.png">
</p>

<h1 align="center">Prettier Plugin Tailwind</h1>

<div align="center">
	Sort tailwind classes with Prettier.
</div>

<br>

Supports

- HTML
- CSS (@apply directive)
- ReactJS (JSX, TSX)
- VueJS
- [twin.macro](https://github.com/ben-rogerson/twin.macro)

**Go from this:**

```html
<div class="z-50 z-10 container  text-left md:text-center justify-center">
	...
</div>
```

**To this:**

```html
<div class="container justify-center text-left z-10 z-50 md:text-center">
	...
</div>
```

This plugin reads your `tailwind.config.js` to sort tailwind classes in your project.

## Installation VSCode

Install Prettier and the plugin into your project locally:

```bash
yarn add --dev prettier prettier-plugin-tailwind
```

**Other IDE's are supported.**

Note: Prettier 2.0.0 or greater is required as a peer dependency.

## Prettier Options

These options can be set in your `.prettierrc` file to change the behavious of this plugin.

- [**`twConfig`**](OPTIONS.md#twconfig) - Path to tailwind config relative to the root of the project.
- [**`twPluginsOrder`**](OPTIONS.md#twpluginsorder) - Comma separated order of tailwind plugins to sort classes by.
- [**`twClassesPosition`**](OPTIONS.md#twclassesposition) - Position of component and utility classes.
- [**`twUnknownClassesPosition`**](OPTIONS.md#twunknownclassesposition) - Position of unknown classes.
- [**`twJsxClassAttributes`**](OPTIONS.md#twjsxclassattributes) - Comma separated list of JSX attributes to sort tailwind classes in.
- [**`twSortFunctions`**](OPTIONS.md#twsortfunctions) - Comma separated list of function names to sort classes in arguments.

More details can be found in [OPTIONS.md](OPTIONS.md)

## Contributing 🙌

Contributions are more than welcome. If you see any changes fit, go ahead and open an issue or PR.

---

Any support is a huge motivation, thank you very much!

<a href="https://www.buymeacoffee.com/ariseyhun" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="32" width="140"></a>
