// Script to resolve merge conflicts by combining both branches' changes

// For plants.json: Keep both name_nl and name_uk fields
const plantsContent = await Deno.readTextFile("Species Lists/plants.json");
const resolvedPlants = plantsContent
  .replace(/<<<<<<< HEAD\n    ("name_nl": [^\n]+)\n=======\n    ("name_uk": [^\n]+)\n>>>>>>> origin\/main/g,
    '    $1,\n    $2')
  .replace(/<<<<<<< HEAD\n  \},\n  \{\n=======\n  \},\n>>>>>>> origin\/main/g,
    '  },\n  {');

await Deno.writeTextFile("Species Lists/plants.json", resolvedPlants);
console.log("Resolved plants.json conflicts");

// For alt_names.json: Keep all entries from both branches
const altNamesContent = await Deno.readTextFile("Species Lists/alt_names.json");

// Extract the conflicting sections
const headMatch = altNamesContent.match(/<<<<<<< HEAD\n([\s\S]*?)\n=======\n/);
const mainMatch = altNamesContent.match(/=======\n([\s\S]*?)>>>>>>> origin\/main/);

if (headMatch && mainMatch) {
  const headEntries = headMatch[1].trim();
  const mainEntries = mainMatch[1].trim();

  // Combine both, removing the last comma from head entries
  const combined = headEntries + ',\n  ' + mainEntries;

  const resolvedAltNames = altNamesContent.replace(
    /<<<<<<< HEAD\n[\s\S]*?>>>>>>> origin\/main/,
    combined
  );

  await Deno.writeTextFile("Species Lists/alt_names.json", resolvedAltNames);
  console.log("Resolved alt_names.json conflicts");
}

console.log("\nAll conflicts resolved! Now run:");
console.log("  git add .");
console.log("  git commit -m 'Resolve merge conflicts: keep both Dutch and Ukrainian translations'");
