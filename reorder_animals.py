import json


with open("Species Lists/animals.json", "r") as f:
    animals = json.load(f)

lang_order = ["es", "fr", "it", "pt", "ca", "de", "ko"]

# Reorder the languages for each animal
for animal in animals:
    for key in animal:
        if key.startswith("name_"):
            animal[key] = {lang: animal[key][lang] for lang in lang_order}
