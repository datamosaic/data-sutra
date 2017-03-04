# Documentation

Using [GitBook](https://www.gitbook.com/) version 3.2.2.

This is the **source** directory for the documentation.

There are **development**, **build** and **deploy** steps.


## Organization

Each major version of Data Sutra has separate documentation. This is accomplished with a directory for each version (`./servoy-06`, `./servoy-08`) where each directory is a standalone GitBook instance.

Separate versions are unified into one interface with a dropdown selector using a [fork](https://github.com/kabootit/gitbook-plugin-versions) of [versions](https://plugins.gitbook.com/plugin/versions) GitBook plugin.


## Development

`gitbook serve` from the directory for version working on (ie, `./servoy-06`). This gives live reload while editing `md` files.


## Build

From this directory (not inside a specific documentation directory), `npm run build` to build files to a temporary `./documentation` directory.

`npm run server` will start up an http server in the `./documentation` directory.

> Note: [http-server](https://www.npmjs.com/package/http-server) needs to be installed globally for this step.

## Deploy


## Install new version




