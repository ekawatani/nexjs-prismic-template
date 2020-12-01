#!/bin/bash

if [ "$VERCEL_ENV" = "production" ]
then
  python3 build-fonts.py
else
  pipenv run python3 build-fonts.py
fi
