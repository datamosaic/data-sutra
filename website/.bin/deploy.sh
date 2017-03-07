#!/bin/bash

# documentation
rm -rf ../docs/documentation
cp -rf favicon.ico doc_src/documentation/servoy-06/gitbook/images/favicon.ico
cp -rf favicon.ico doc_src/documentation/servoy-08/gitbook/images/favicon.ico
cp -rf apple-touch-icon-144x144.png doc_src/documentation/servoy-06/gitbook/images/apple-touch-icon-precomposed-152.png
cp -rf apple-touch-icon-144x144.png doc_src/documentation/servoy-08/gitbook/images/apple-touch-icon-precomposed-152.png
cp -rf doc_src/documentation ../docs


# website
rm -rf ../docs/index.html
cp -rf index.html ../docs/index.html

rm -rf ../docs/library
cp -rf library ../docs/library
cp -rf favicon.ico ../docs/favicon.ico

# git
git add -A
git commit -m 'update documentation'
git push 