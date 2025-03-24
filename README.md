# Metazooa Translations
`metazooa-translations` is official repo for translations of [Metazooa](https://metazooa.com) and [Metaflora](https://flora.metazooa.com). This repo is maintained by [Trainwreck Labs](https://trainwrecklabs.com).

## Adding a new language
If you would like to contribute a new translation, or correct an existing one, please submit a pull request to this repo with the desired changes. Languages need to be added in 2 locations: the Language Text folder and the Species Lists folder.

### Language Text
1. Create a file in the Language Text folder titled with the appropriate language or locale code (e.g. "fr-FR.json").
   1. If you're not familiar with locale codes, the first 2 letters is the language and the second 2 letters is the country. [See France French example](https://www.localeplanet.com/icu/fr-FR/index.html).  
   2. Currently, there is no need to create a new file for a second locale of an existing language (e.g. "fr-FR" and "fr-CA"). Please do not add redundant languages.
2. Copy all the keys from "en-CA.json" into the new JSON file you created.
3. Populate the values of the file with translations of the values in en-CA.
   1. The words in {{curly brackets}} are key words and should not be translated directly in the text, but rather in the Metazooa and Metaflora sections at the top of the translation file.
   2. The curly brackets and their contents may need to be moved within a sentence according to the new language's syntax.
   3. If there is a keyword (i.e. any word in the Metazooa or Metaflora sections at the top) that does not appear in curly brackets in the text, feel free to forgo translating it.
   4. If you need more information about the context of a phrase, locate the English text in the game's website. The key's provide a hint to where the text is in the game.
   

### Species List
1. For both of the Species Lists files, add a new key to each object for the name of the species in the new language (e.g. "name_fr" for French).
   1. If you only want to submit translations for Metazooa and not Metaflora, that's alright, just ignore plants.json.
2. Add the translated species name into each key.
3. If there is more than one common name for the same species, use the name that is the most common or "technically" appropriate in the main JSON file, and add alternatives to the file called alt_names.json. 
   1. For example, only "cattle" exists in animals.jon, but alt_names contains `{ "language": "en", "name": "cattle", "alts": ["cow", "bull"] },` 
   2. There is one alt_names file for both animals and plants, and all languages.


## Non-programmer instructions
If this is your first time on GitHub and you don't know what a pull request is, you can still contribute! Share your translations in the [Discord server](https://discord.gg/CMxAF2FEdB) or email them to me at abe@trainwrecklabs.com.

## Correcting an existing translation
If you notice an incorrect translation in an language already available in the game, feel free to submit a pull request to change it. In your pull request, please include a note about why your translation is more appropriate.

## Quick Corrections for Species Names
If you want to suggest a correction to a specific species name in any existing language without adding an entirely new language, you can use our [Google Form](https://forms.gle/kRXL4iM3tDgyXrsW6). This is ideal for small corrections when you don't want to create a pull request. You can also use this form to correct the Wikipedia article associated with any clade, or recommend new alternative names that should be accepted for a given species.

## Final notes
- Accepted pull requests still need to be hardcoded into the actual code for each game, so translations will not go into effect immediately. 
- Any and all languages are welcome.
- If there is any text in the game that is not in the translation file, please let me know.
- If you have any questions, please share them with the [Trainwreck Labs Discord server](https://discord.gg/CMxAF2FEdB).

I am extremely grateful to anyone who takes the time to help make Metazooa and Metaflora more accessible to players around the world. Thank you!