#!/bin/bash

if [ "$VERCEL_ENV" = "production" ]
then
  pip3 install -Iv pipenv==2020.11.15
else
  pipenv install
fi
