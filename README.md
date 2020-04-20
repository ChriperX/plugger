# Plugger
Plugger is a library to add plugin-compatibility to a library.

# Legend
- [Install](#install)
  - [yarn](#yarn)
  - [npm](#npm)
- [How to make a library pluggable](#how-to-make-a-library-pluggable)
- [How to use and make plugins](#how-to-use-and-make-plugins)
- [Tips](#tips)
- [Examples](#examples)
  - [Explicit import](#explicit-import)
  - [Using the importing library's variables](#using-the-importing-library's-variables)
- [Notes](#notes)

# Install

### yarn
```bash

$ yarn add @nonamenpm/plugger

```

### npm

```bash

$ npm i @nonamenpm/plugger

```

# How to make a library pluggable

Lets say we have a library called **my-library** and we want to make it compatible for plugins:

```js
//import the plugger
const plugger = require('@nonamenpm/plugger')

//make a public function to be accessed by applications importing the library
exports.use = function(plugins) {
    //first parameter are the plugins to be imported
    //second parameter should always be this
    //third parameter is override: set to true to make plugins override existing variables
    plugger(plugins, this, false)
}
```

That's it, you only need one function to make a library pluggable

# How to use and make plugins

To use plugins in an application is really simple.

It's similiar to chai's plugin system:

```js
//import the plugin compatible library
const myLib = require('my-lybrary')
const myPlugin = require('./my-plugin.js')

//you can even use plugins uploaded to npm!
myLib.use([myPlugin])

myLib.sayHello('Mark')
```

To make a plugin you have to simply export a variable (or function) and plugger will take care of the rest:

```js
//my-plugin.js

exports.sayHello = function(name) {
    console.log('Oh hi ' + name + '!')
}
```

# Tips

- You can use **this** in a plugin to access a variable set by the importing library.
- In an application you can directly specify to import plugins from a specific directory.
- To use a function of a plugin in an importing library you have to use the plugger function directly. 

# Examples

### Explicit import

```js
//my-plugin.js

exports.add = function(x, y) {
    return x + y;
}
```

```js
// require the plugger library.
const plugger = require('@nonamenpm/plugger')
//import the plugin
const myPlugin = require('my-plugin')

//define the plugin entry point (we export it so when this library is imported users can specify which plugins to import)
exports.use = function(plugins) {
    plugger(plugins, this, false)
}

//call the use() function (we are directly importing the plugin)
exports.use([ myPlugin ])

//myPlugin's add function
console.log(exports.add(3, 7));

```

### Using the importing library's variables

```js
//my-plugin.js

exports.versionNumber = function() {
    console.log(this.version)
}
```

```js
//my-lib.js

//require the plugger library
const plugger = require('@nonamenpm/plugger')

exports.use = function(plugins) {
    plugger(plugins, this, false)
}

exports.version = '1.0.5'

```

```js
//index.js

const myLib = require('my-lib')
const myPlugin = require('./my-plugin.js')

myLib.use([ myPlugin ])

myLib.versionNumber()
```

# Notes

- If there you want to override a variable, please put **true** in the third argument of plugger().
- If there are conflicting names in the plugin and the importing library

