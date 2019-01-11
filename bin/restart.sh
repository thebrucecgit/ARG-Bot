#!/bin/bash
# Use !restart to restart the bot.

cd ~/Bot/ &&
git pull origin master &&
npm i &&
pm2 restart 0;
