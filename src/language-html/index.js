// const parsers = require('./parser-html')
const printer = require("./printer-html");
const createLanguage = require("../utils/create-language");

const languages = [
  createLanguage(require("linguist-languages/data/HTML"), data =>
    Object.assign(data, {
      since: "1.15.0",
      parsers: ["html"],
      vscodeLanguageIds: ["html"],
      extensions: data.extensions.concat([
        ".mjml" // MJML is considered XML in Linguist but it should be formatted as HTML
      ])
    })
  ),
]

const printers = {
  html: {
    print: () => {
      console.log('hey')
      return 'poo'
    }
  }
};

module.exports = {
  languages,
  printers,
}
