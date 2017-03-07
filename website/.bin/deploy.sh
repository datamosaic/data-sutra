#!/bin/bash

# documentation
rm -rf ../docs/documentation
cp -rf favicon.ico doc_src/documentation/servoy-06/gitbook/images/favicon.ico
cp -rf favicon.ico doc_src/documentation/servoy-08/gitbook/images/favicon.ico
cp -rf apple-touch-icon-144x144.png doc_src/documentation/servoy-06/gitbook/images/apple-touch-icon-precomposed-152.png
cp -rf apple-touch-icon-144x144.png doc_src/documentation/servoy-08/gitbook/images/apple-touch-icon-precomposed-152.png
cp -rf doc_src/documentation ../docs


# website



# git
git add -A
git commit -m 'update documentation'
git push 