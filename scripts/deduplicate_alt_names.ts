interface AltName {
  language: string;
  name: string;
  alts: string[];
}

const altNames: AltName[] = JSON.parse(
  await Deno.readTextFile("Species Lists/alt_names.json")
);

// Create a map to track duplicates by language + name
const deduplicatedMap = new Map<string, AltName>();

for (const entry of altNames) {
  const key = `${entry.language}:${entry.name}`;

  if (deduplicatedMap.has(key)) {
    // Duplicate found - merge the alts arrays
    const existing = deduplicatedMap.get(key)!;
    console.log(`\nFound duplicate for ${entry.language} - "${entry.name}"`);
    console.log(`  Existing alts: [${existing.alts.join(", ")}]`);
    console.log(`  New alts: [${entry.alts.join(", ")}]`);

    // Combine alts and remove duplicates using Set
    const combinedAlts = [...new Set([...existing.alts, ...entry.alts])];
    existing.alts = combinedAlts;

    console.log(`  Combined alts: [${combinedAlts.join(", ")}]`);
  } else {
    // First occurrence - add to map
    deduplicatedMap.set(key, {
      language: entry.language,
      name: entry.name,
      alts: [...new Set(entry.alts)], // Remove duplicates within the same entry
    });
  }
}

// Convert map back to array
const deduplicated = Array.from(deduplicatedMap.values());

console.log(
  `\n\nOriginal entries: ${altNames.length}, Deduplicated entries: ${deduplicated.length}`
);

if (altNames.length !== deduplicated.length) {
  console.log(`Removed ${altNames.length - deduplicated.length} duplicate(s)`);
}

// Write the deduplicated data back to the file with each object on a single line
const compactJson = [
  "[",
  ...deduplicated.map((item, index) => {
    const json = JSON.stringify(item);
    return index < deduplicated.length - 1 ? `  ${json},` : `  ${json}`;
  }),
  "]",
].join("\n");

await Deno.writeTextFile("Species Lists/alt_names.json", compactJson + "\n");

console.log("\nDeduplicated alt_names.json has been saved!");
