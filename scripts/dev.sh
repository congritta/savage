#!/usr/bin/env bash

echo "♨️ Running in development mode..."

yarn tsc -w &
yarn node --watch-path=dist dist/index.js
