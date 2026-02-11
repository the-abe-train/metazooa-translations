interface Animal {
  [key: string]: unknown;
}

const animals: Animal[] = JSON.parse(
  await Deno.readTextFile("Species Lists/animals.json")
);

const langOrder = ["es", "fr", "it", "pt", "ca", "de", "ko"];

// Reorder the languages for each animal
for (const animal of animals) {
  for (const key in animal) {
    if (key.startsWith("name_")) {
      const names = animal[key] as Record<string, string>;
      animal[key] = Object.fromEntries(
        langOrder.map((lang) => [lang, names[lang]])
      );
    }
  }
}

await Deno.writeTextFile(
  "Species Lists/animals.json",
  JSON.stringify(animals, null, 2)
);

console.log("Done reordering animals");
