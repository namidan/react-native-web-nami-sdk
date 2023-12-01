# react-native-web-nami-sdk

## ⚒ In development mode ⚒

This is a react-native-web version of NamiML for web/cross-platform projects, for example: [react-native-nami-sdk](https://github.com/namiml/react-native-nami-sdk)

## Compatibility table

| react-native-web-nami-sdk | Browser                                      |
|-------|-------------------------------------------------------------|
| 0.0.1 |                react / react-native-web / react-native expo |
| 0.1.9 |                react / react-native-web / react-native expo |


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


## Warning

Right now we got to pack our lib using npm pack for testing purposes, because it doesn't yet published on npm/yarn, so we just paste path to the tgz files.
Be noticed that you need to add _alpha prefix when you're packing library, because we need save right versioning.
Regards.
