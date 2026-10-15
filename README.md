# Metazooa Translations

`metazooa-translations` is the official repository for translations of
[Metazooa](https://metazooa.com) and [Metaflora](https://flora.metazooa.com), maintained
by [Trainwreck Labs](https://trainwrecklabs.com).

## Table of contents

- [Current game reference](#current-game-reference)
- [Adding a new language](#adding-a-new-language)
  - [Language text](#language-text)
  - [Species lists](#species-lists)
  - [Alternative names](#alternative-names)
  - [Slovak contribution checklist](#slovak-contribution-checklist)
- [Non-programmer instructions](#non-programmer-instructions)
- [Correcting an existing translation](#correcting-an-existing-translation)
- [Quick corrections for species names](#quick-corrections-for-species-names)
- [Slovak integration](#slovak-integration)
- [Pending translations](#pending-translations)
- [Maintainer integration](#maintainer-integration)
- [Final notes](#final-notes)

## Current game reference

The `Language Text` and `Species Lists` files were compared with the TWL monorepo
on October 15, 2026, at commit
[`49263bb1`](https://github.com/the-abe-train/twl-monorepo/commit/49263bb19943bd42f8166900155c12d1f1bd0352).
The base resources matched the corresponding committed game resources as parsed
data. The Slovak contribution described below is added on top of that baseline:

- `Language Text/*.json`: the original 15 locale files in
  `apps/metazooa/src/lib/data/translations/*.ts`.
- `Species Lists/animals.json`: `scripts/meta-data-prep/curated/animals.ts`
  (343 animals).
- `Species Lists/plants.json`: `scripts/meta-data-prep/curated/plants.ts`
  (215 plants).
- `Species Lists/alt_names.json`:
  `apps/metazooa/src/lib/data/alt_names.json` (745 baseline records, plus 49 Slovak records).

This is a reference to committed game source. Pending local changes and open
translation pull requests are not included. Existing wording, including any
English text in another locale, reflects that source; suggested improvements
can still be contributed separately.

The integrated Metazooa language list includes `en`, `es`, `de`, `fr`, `it`, `pt`, `ca`, `ko`, `hu`,
`uk`, `cs`, `tr`, `nl`, `ru`, `pl`, and `sk`. Metaflora enables `en`, `es`, `de`, `fr`,
`it`, `pt`, `hu`, `cs`, `tr`, `nl`, `uk`, and `ru`. A language file may therefore
exist before that language is enabled for both games.

## Adding a new language

Please submit a pull request with the translated interface text and species
names. Translating only Metazooa or only Metaflora is welcome; identify which game
your contribution covers.

### Language text

1. Copy [Language Text/en-CA.json](Language%20Text/en-CA.json) to a new file named
   with the language and locale code, such as `sk-SK.json` for Slovak. Keep the
   outer `translation` object and the existing key names and structure. There is
   currently no need for a second locale of an already supported language.
2. Translate the string values. The `Metazooa` and `Metaflora` sections contain
   game-specific words and grammatical forms used by the rest of the text. If
   you are translating only one game, leave the other section intact and explain
   the scope of your contribution.
3. Preserve interpolation tokens exactly, including spelling, capitalization,
   dots, and both pairs of braces. For example, `{{species.definite}}`,
   `{{guess}}`, `{{MAX_GUESSES}}`, and `{{nextGame}}` must keep their names, but
   may move within a sentence. Translate the corresponding game-specific values
   where applicable; runtime values such as `{{guess}}` come from the game.
4. Preserve HTML tags, link destinations, and valid JSON escaping. Only translate
   visible text inside links and tags. The current template includes `share.4`
   (sharing in progress), `share.5` (retry), and `settings.4` (dark mode).
5. Use the game website to check context. The key names indicate where text is
   used. If your language needs additional grammatical forms or placeholders,
   describe them in the pull request so the game integration can support them.

### Species lists

1. For Metazooa, add a `name_<language>` field to every record in
   [Species Lists/animals.json](Species%20Lists/animals.json). For Metaflora, do
   the same in [Species Lists/plants.json](Species%20Lists/plants.json).
2. Use the language code without the country: for example, Slovak uses
   `name_sk`, not `name_sk-SK`.
3. Preserve each numeric `nodeId`, `scientific_name`, English `name`, existing
   translations, and record order. Match incoming files by `nodeId`; do not
   assume their row order matches the current list.
4. Choose the most common or technically appropriate localized species name as
   the main name. Put other accepted common names in the alternative-name file.

### Alternative names

[Species Lists/alt_names.json](Species%20Lists/alt_names.json) is shared by both
games and all languages. Each record has a language code, the canonical name
from that language's species field, and an array of accepted alternatives:

```json
{ "language": "en", "name": "cattle", "alts": ["cow", "bull", "steer", "ox"] }
```

For Slovak, use `"language": "sk"` and the exact corresponding `name_sk` value as
`name`. Preserve existing alternatives when adding new ones. Alternatives are
optional if there are no additional common names to suggest.

### Slovak contribution checklist

- `Language Text/sk-SK.json`, based on the current English template.
- `name_sk` on all 343 animal records for a complete Metazooa translation.
- Optional Slovak alternatives in `Species Lists/alt_names.json`.
- `name_sk` on all 215 plant records only if also contributing Metaflora.
- A note identifying any missing species, untranslated interface text, or extra
  grammatical forms needed by Slovak.

The Slovak contribution is integrated into the Metazooa source.
Production availability depends on review, taxonomy publication, and release.

## Non-programmer instructions

If this is your first time on GitHub, you can still contribute! Share your files
in the [Discord server](https://discord.gg/CMxAF2FEdB) or email them to
abe@trainwrecklabs.com. Please identify the language and which game you translated.

## Correcting an existing translation

Submit a pull request with the correction and a short explanation of why the
new translation is more appropriate. Include the file and key or species
`nodeId` when possible.

## Quick corrections for species names

Use our [Google Form](https://forms.gle/kRXL4iM3tDgyXrsW6) for small species-name
corrections without creating a pull request. You can also suggest corrections to
Wikipedia articles associated with clades or recommend alternative species names.

## Slovak integration

The October 15, 2026 Slovak contribution adds `Language Text/sk-SK.json`,
`name_sk` on all 343 animals, and 49 alternative-name records containing 54
Slovak alternatives. The repository now has 16 interface locale files and 794
alternative-name records. Metaflora is not included in this contribution.

The supplied animal file needed five missing commas, and the alternative-name
file needed its closing array bracket. Only the Slovak fields and records were
merged, preserving current corrections in other languages. The two newer sharing
messages absent from the submission were added as `Zdieľanie…` and
`Skúsiť znova`. Three English interface keywords left in the submission were
translated as `zostáva`, `Kliknite`, and `Ťuknite`. Original contributor wording
is otherwise retained.

The TWL monorepo integration registers `sk` as `Slovenčina` for Metazooa,
adds Slovak to the taxonomy build and lookup types, and permits Slovak guesses
through the current daily/practice request boundary. A taxonomy release containing
these names must accompany the application release.

## Pending translations

The October 15 sync preserves earlier contributor wording separately in
[Pending Translations/it-IT.json](Pending%20Translations/it-IT.json) and
[Pending Translations/ru-RU.json](Pending%20Translations/ru-RU.json). These are
snapshots from translation-repository commit `45f60e4`, before this sync. They
contain Italian and Russian wording that differs from the committed game,
including translated passages where the game still has English text.

These snapshots are retained for a future reviewed integration. They are not
current game templates and do not include the newly synchronized sharing keys.
Use `Language Text/en-CA.json` as the starting point for a new language.

## Maintainer integration

Accepted translation contributions still need to be integrated into the TWL
monorepo before they appear in either game:

- Convert interface JSON into the game's TypeScript translation resources under
  `apps/metazooa/src/lib/data/translations`.
- Register a new language in `apps/metazooa/src/lib/util/i18n.ts` (resources,
  enabled games, and display name) and
  `apps/metazooa/src/lib/schemas/i18nSchemas.ts` (language and translation types).
  Additional grammatical placeholders also need support in the parameter
  collection in `apps/metazooa/src/lib/util/i18n.server.ts`.
- Update the curated animal or plant lists and shared alternative names. Species
  data is published through `scripts/meta-data-prep`; changing this repository
  alone does not update the game's taxonomy data.
- Review and validate the contribution before release. This repository's existing
  helper scripts contain language-specific settings; they are not an automatic
  new-language deployment process.

## Final notes

- All languages are welcome.
- If any game text is missing from the translation file, please let us know.
- For questions, visit the
  [Trainwreck Labs Discord server](https://discord.gg/CMxAF2FEdB).

Thank you to everyone helping make Metazooa and Metaflora accessible to players
around the world!
