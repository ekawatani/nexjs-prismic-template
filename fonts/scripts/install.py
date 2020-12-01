import os
import sys
import subprocess

if 'NODE_ENV' in os.environ and os.environ['NODE_ENV'] == 'production':
  subprocess.check_call(['pip3', 'install'])
else:
  subprocess.check_call(['pipenv', 'install'])
