#!/usr/bin/env bash

clear
echo "🛠️ Building..."

rm -rf dist || true
rm -rf types || true

yarn tsc &&
  echo "✔️ Built!"
