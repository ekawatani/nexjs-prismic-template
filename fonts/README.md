# Fonts
This project builds font files based on characters used on the site.

## Introduction
This projects requires `python3` for building font files. It uses `pyenv` to install dependencies locally. Otherwise `pip3` is used in production based on whether the `NODE_ENV` environment variable is set to `production` or not.

This is because there's no `pyenv` available by default on the Vercel platform. The environment variable must be set manually on your Vercel project.
