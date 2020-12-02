import os
import glob
import json
import sys
from html.parser import HTMLParser
from fontTools.subset import main as fontSubset

TEMP_DIR = '../.tmp'
PUBLIC_DIR = '../public'
I18N_CONFIG_FILE = '../i18n.json'
ORIGINAL_FONT_FILE = './appli-mincho.otf'
FONT_DIR = os.path.join(PUBLIC_DIR, 'fonts')
FONT_NAME = 'AppliMincho.otf'

class LocaleStringParser(HTMLParser):
  def __init__(self):
    super().__init__()

    self.characters = set()

  def handle_data(self, data):
    self.characters.update(data)

def extractCharacters(locale):
  localeFile = open(os.path.join(TEMP_DIR, f'{locale}.json'), 'r')
  localeData = json.loads(localeFile.read())
  localeFile.close()

  parser = LocaleStringParser()

  for (key, value) in localeData.items():
    parser.feed(value)

  return parser.characters

def buildOptimizedFonts():
  i18nFile = open(I18N_CONFIG_FILE, 'r')
  i18nData = json.loads(i18nFile.read())
  i18nFile.close()

  localeChars = set()
  extractedChars = set()

  # Read all locale files.
  for locale in i18nData['locales']:
    extracted = extractCharacters(locale)
    localeChars.update(extracted)
  
  # Read all extracted files.
  for filename in glob.glob(os.path.join(TEMP_DIR, '*.txt')):
    with open(os.path.join(os.getcwd(), filename), 'r') as extractedFile:
      extractedChars.update(extractedFile.read())
  
  localeCharsList = ''.join(list(localeChars))
  extractedCharsList = ''.join(list(extractedChars))
  print('Locale:"{0}"'.format(localeCharsList))
  print('Extracted:"{0}"'.format(extractedCharsList))

  # Remove duplicate characters and contatenate into one string.
  characters = set()
  characters.update(localeChars)
  characters.update(extractedChars)
  subsetChars = ''.join(list(characters))

  if not os.path.exists(FONT_DIR):
    os.makedirs(FONT_DIR)

  optimizeFont(subsetChars, ORIGINAL_FONT_FILE)
  
def optimizeFont(text, originalFontPath):
  sys.argv = [None, originalFontPath, f'--text={text}', f'--output-file={os.path.join(FONT_DIR, FONT_NAME)}']
  fontSubset()

buildOptimizedFonts()
