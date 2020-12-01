import os
import sys
import subprocess

if 'VERCEL_ENV' in os.environ and os.environ['VERCEL_ENV'] == 'production':
  subprocess.check_call('python3', 'build-fonts.py')
else:
  subprocess.check_call(['pipenv', 'run', 'python3', 'build-fonts.py'])
