#!/bin/bash

rm -rf ../../docs/documentation
cp -rf documentation ../../docs
git add -A
git commit -m 'update documentation'
git push 