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
switch (minorVersion) {
  case 62:
    patchDir = '0.62.1';
  case 61:
    patchDir = '0.61.5';
  case 60: 
    patchDir = '0.60.5';
    break;
  case 59:
    if (patchVersion >= 8) {
      patchDir = '0.59.8';
    } else if (patchVersion >= 5) {
      patchDir = '0.59.5';
    } else if (patchVersion >= 3) {
      patchDir = '0.59.3';
    }
    break;
  case 58:
    patchDir = '0.58.6';
    break;
  case 57:
  case 56:
    patchDir = '0.57.8';
    break;    
  case 55:
    patchDir = '0.55.4';
    break;
  case 54:
    patchDir = '0.54.4';
    break;
  default:    
    break;
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
