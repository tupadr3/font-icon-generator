# Font icon generator

## Introduction

...

## Install

### Windows

```bash
npm install --global --production windows-build-tools
```

### Linux

```bash
apt install librsvg2-bin openjdk-11-jre
```

## Build

```bash
mkdir .tmp -p
git clone git@github.com:tupadr3/plantuml-icon-font-sprites.git github
cd github
git checkout develop
cd ../..
yarn build --github
```

## Todo

-   code cleanup
-   readme
-   ....
