# MKAUNTS: [Mongo](https://www.mongodb.com/) [Koa](http://koajs.com/) [Aurelia](http://aurelia.io/) [Node](https://nodejs.org/en/) [Typescript](https://www.typescriptlang.org/)

This is a template for creating a [Node](https://nodejs.org/en/) https application that hosts an [Aurelia](http://aurelia.io/) [SPA](https://en.wikipedia.org/wiki/Single-page_application) using [Koa](http://koajs.com/) as a router and [Mongo](https://www.mongodb.com/) as a database written in [Typescript](https://www.typescriptlang.org/).

## Prerequisites

1. [Install Node](https://nodejs.org)
2. [Download Mongo](https://www.mongodb.com/download-center?jmp=nav#community)
3. [Install Mongo](https://docs.mongodb.com/manual/administration/install-community/)

Of course you do not need to install Mongo locally. You can connect to any other MongoDB you have. <br>
Make sure to update the Mongo connection string in config/default.json

### Install Tools

Run the following commands from the command line

4. npm install gulp -g
5. npm install jspm -g

### Install Packages
Ensure you are in mkaunts/ i.e. the folder with the package.json

6. npm install
7. jspm install
8. typings install

## Building
We use [gulp](http://gulpjs.com/) as a taskrunner to handle building the app. <br>
All of the gulp tasks are located in the build/ folder. <br>

### Important Gulp Tasks
#### gulp build
This task transpiles the source Typescript located in src/ into Javascript and places it in the app/ folder.

#### gulp watch
This task essentially runs a gulp build whenever it detects changes to the source code.

#### gulp bundle
This task bundles the client source. <br>
The build/bundles.js file determines what is bundled and where. This file will need to be updated if you add more jspm packages.

#### gulp export
This tasks produces a folder called export/ that contains the bundled client code and any other files that are necessary for the client but cannot be placed in the bundle. <br>
The idea here is that you want to publish the smallest amount of code possible.
For example 'jspm_packages/system.js' is included in the export since it is necessary to load packages from the bundle so it cannot be a part of the bundle.
Also it can be important to export some css files that are needed in the index.html.<br>
The build/export.js file determines what is exported.

## Running the App
    node ./dist/node/app.js
Will start the app from the root folder i.e. mkaunts/ <br>
Alternatively just hit F5 in VS Code.

### Debugging
Source maps are generated when we build that allow us to debug the Typescript directly instead of the Javascript. <br>
Debugging the server code in VS Code works. <br>
Debugging the client coe in Chrome works. However, the client sourcemaps have an inline copy of the Typescript. This is because the src folder is not being served by our app so Chrome Chrome is not able to find the true source Typescript.<br>

## Package Management

The server and client portions of the application import packages in different ways. <br>
They are both written in Typescript though. So be sure to download type defintion files for any packages you are using.

### Server Package Management
The client uses [npm](https://www.npmjs.com/) to manage packages. These packages are in the node_modules/ folder.

    npm install <package_name> --save 
will install a package

### Client Package Management
The client uses [jspm](http://jspm.io/) to manage packages. <br>
Jspm can install packages from npm and Github.

    jspm install <package_name>
will install a package.

Jspm will automatically update the app/public/config.js whenever you add a package.
This is a map between normalized package names and their paths. <br>

When installing a package on the client be sure to add it to the build/bundles.js file if you intend on bundling.

## Type Defintion Files
Type definition files allow us to define type information for Javascript code.

This is important when importing third party packages since they are most likely Javascript libraries that do not contain type information.

Type defintion files have the extension d.ts and are usually written by someone else who did not actually write the library they are defining types for.

[Typings](https://github.com/typings/typings) is similar to jspm or npm except that it is just for installing type definition files.

The

    typings install
step earlier downloaded type defintion files into the typings/ folder.

Typings can install a type definition file with

    typings install <package_name> --save

We can also install type definition files with npm.

    npm install @types/<package_name> --save-dev

will install a type definition file into the node_modules/@types/ folder.

It seems like [@types](https://www.npmjs.com/~types) is the main way that type definition files will be acquired in the future.
