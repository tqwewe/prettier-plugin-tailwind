const prettierParserHTML = require('prettier/parser-html').default
const TWClassesSorter = require('tailwind-classes-sorter').default

const twClassesSorter = new TWClassesSorter()

const parser = (text, parsers, options) => {
  const result = prettierParserHTML.parsers.html.parse(
    text,
    parsers,
    options
  )
  const sortElementClasses = el => {
    if (el.attrs) {
      const classAttr = el.attrs.find(attr => attr.name === 'class')
      if (classAttr) {
        const classList = classAttr.value
          .split(' ')
          .map(classItem => classItem.trim())
          .filter(classItem => classItem.length > 0)
        classAttr.value = twClassesSorter.sortClasslist(classList).join(' ')
      }
    }

    if (el.children && el.children.length > 0) {
      el.children.forEach(childEl => sortElementClasses(childEl))
    }
  }
  sortElementClasses(result)
  return result
}

module.exports = parser

// module.exports = {
//   parsers: {
//     'tailwind-classes-sorter-html': {
//       ...prettierParserHTML.parsers.html,
//       parse: parser,
//     }
//   }
// }
