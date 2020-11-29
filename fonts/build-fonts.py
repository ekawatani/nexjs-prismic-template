import os
import json
import sys
from html.parser import HTMLParser
from fontTools.subset import main as fontSubset

TEMP_DIR = '../.tmp'
PUBLIC_DIR = '../public'
I18N_CONFIG = '../i18n.json'
ORIGINAL_FONT = './appli-mincho.otf'
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
  i18nFile = open(I18N_CONFIG, 'r')
  i18nData = json.loads(i18nFile.read())
  i18nFile.close()

  characters = set()

  for locale in i18nData['locales']:
    extracted = extractCharacters(locale)
    characters.update(extracted)
  
  subsetChars = ''.join(list(characters))
  print(subsetChars)

  if not os.path.exists(FONT_DIR):
    os.makedirs(FONT_DIR)

  optimizeFont(subsetChars, ORIGINAL_FONT)
  
def optimizeFont(text, originalFontPath):
  sys.argv = [None, originalFontPath, f'--text={text}', f'--output-file={os.path.join(FONT_DIR, FONT_NAME)}']
  fontSubset()

buildOptimizedFonts()
