#!/bin/bash

cd ~/Bot/ &&
git pull origin master &&
npm i &&
pm2 restart 0;
