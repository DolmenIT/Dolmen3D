@echo off

npm install -g typescript
npm install -g uglify-js
npm install webpack webpack-cli --save-dev
npm install -D webpack-cli

tsc --init
