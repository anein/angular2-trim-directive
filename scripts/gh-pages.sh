#!/usr/bin/env bash
set -o errexit

# pre-deploy
cd example/dist

# config
git config --global user.email "nobody@nobody.org"
git config --global user.name "Travis CI Bot"

#
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
