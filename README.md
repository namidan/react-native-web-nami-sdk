# react-nami

## ⚒ In development mode ⚒

This is a react-native-web version of NamiML for web/cross-platform projects, for example: [react-native-nami-sdk](https://github.com/namiml/react-native-nami-sdk)

## Compatibility table

| react-nami | Browser                                      |
|------------|----------------------------------------------|
| 0.0.1      | react / react-native-web / react-native expo |


## Setup for development

First of all you need to create an appropriate tree of project form development purposes like so:

### Project tree
* [nami]()
* [react-nami/]()
    * [dist]()
    * [src]()
* [react-native-web-nami-sdk/]()
  * [src]()
  * [babel.config.js]()
  * [metro.config.js]()
  * [tsconfig.js]()
  * [examples/]()
    *  [expo-basic/]()
          * [src/]()
          * [babel.config.js]()
          * [metro.config.js]()
          * [tsconfig.js]()

You need to create nami folder and paste there our packages like so, after this you will be able to developing like a charm with ability to get updated methods without any package updates.

We configure paths through tsconfig, babel.config and metro.config for this purposes.
