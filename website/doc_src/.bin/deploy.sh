#!/bin/bash

rm -rf ../../docs/documentation
cp -rf favicon.ico documentation/servoy-06/gitbook/images/favicon.ico
cp -rf favicon.ico documentation/servoy-08/gitbook/images/favicon.ico
cp -rf documentation ../../docs
git add -A
git commit -m 'update documentation'
git push 