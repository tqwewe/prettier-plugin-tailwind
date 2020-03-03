const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

const code = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Masters Theme - Index</title>
    <link rel="stylesheet" href="../dist/styles.css" />
  </head>
  <body>
    <!-- Announcement bar -->
    <div class="text-gray-100 text-center text-sm bg-black py-2">
      Announcement bar message • text content
    </div>

    <!-- Header bar-->
    <div>
      <div class="mx-auto flex justify-between items-center  max-w-6xl h-16">
        <a href="#" class="w-3/12 text-xl font-black bg-red-100">Store Name</a>

        <div class="flex font-medium">
          <a href="#" class="mx-4">Menu1</a>
          <a href="#" class="mx-4">Menu2</a>
          <a href="#" class="mx-4">Menu3</a>
          <a href="#" class="mx-4">Menu4</a>
          <a href="#" class="mx-4">Menu5</a>
        </div>

        <div class="flex justify-between items-center w-3/12 bg-red-100">
          <button><img src="../images/icons/search.svg" class="w-5" /></button>
        </div>
      </div>
    </div>
  </body>
</html>
`
const output = prettier.format(code, {
  parser: 'tailwind-html',
  pluginSearchDirs: ['./'],
  plugins: ['./prettier-plugin-tailwind'],
})
console.log(output)
