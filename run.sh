#!/bin/bash

echo "启动Jekyll服务器..."
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload
