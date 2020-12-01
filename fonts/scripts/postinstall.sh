#!/bin/bash

if [ "$VERCEL_ENV" = "production" ]
then
  pip3 install -Iv fonttools==4.17.1
else
  pipenv install
fi
