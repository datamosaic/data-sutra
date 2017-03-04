# example from https://github.com/vuejs/vuex/blob/dev/docs/deploy.sh

rm -rf _book
gitbook build
# cp assets/circle.yml _book/circle.yml
# cp assets/CNAME _book/CNAME
# cd _book
# git init
# git add -A
# git commit -m 'update book'
# git push -f git@github.com:vuejs/vuex.git master:gh-pages