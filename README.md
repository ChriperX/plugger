# Plugger
Plugger is a plugin library to add plugin-compatibility to a library.

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

To make a plugin you have to do this

```js

//my-plugin.js

exports.sayHello = function(name) {
    console.log('Oh hi ' + name + '!')
}
```