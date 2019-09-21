#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '.');

const packageFile = fs.readFileSync(`${rootPath}/../react-native/package.json`);
const package = JSON.parse(packageFile);

const version = package.version.split('.');
const majorVersion = parseInt(version[0], 10);
const minorVersion = parseInt(version[1], 10);
const patchVersion = parseInt(version[2], 10);

let patchDir = '';
if (minorVersion >= 60) {
  patchDir = '0.60.5';
} else if (minorVersion === 59) {
  if (patchVersion >= 8) {
    patchDir = '0.59.8';
  } else if (patchVersion >= 5) {
    patchDir = '0.59.5';
  } else if (patchVersion >= 3) {
    patchDir = '0.59.3';
  }
} else if (minorVersion === 58) {
  patchDir = '0.58.6';
} else if (minorVersion === 56 && minorVersion === 57) {
  patchDir = '0.57.8';
} else if (minorVersion === 55) {
  patchDir = '0.55.4';
} else if (minorVersion === 54) {
  patchDir = '0.54.4';
}

if (patchDir === '') {
  console.log('[!] Unsupported react-native version!');
  process.exit(1);
}

fs.copyFileSync(
  `${rootPath}/patches/${patchDir}/VirtualizedList.js`,
  `${rootPath}/../react-native/Libraries/Lists/VirtualizedList.js`,
);

console.log('[!] FlatList was patched!');
