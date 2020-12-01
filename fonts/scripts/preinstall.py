import os
import sys
import subprocess

if 'VERCEL_ENV' in os.environ and os.environ['VERCEL_ENV'] == 'production':
  subprocess.check_call([sys.executable, '-m', 'pip3', 'install', '-Iv', 'pipenv==2020.11.15'])
