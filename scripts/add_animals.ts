interface Species {
  nodeId: string;
  [key: string]: unknown;
}

const newLang = "pt";
const kingdom = "plants";

const newSpecies: Species[] = JSON.parse(
  await Deno.readTextFile(`data/${kingdom}_${newLang}.json`)
);

const oldSpecies: Species[] = JSON.parse(
  await Deno.readTextFile(`Species Lists/${kingdom}.json`)
);

const nodes = oldSpecies.map((species) => species.nodeId);
const newNodes = newSpecies.map((species) => species.nodeId);

// Check for new nodes not in old species
for (const newNode of newNodes) {
  if (!nodes.includes(newNode)) {
    const species = newSpecies[newNodes.indexOf(newNode)];
    console.log(`Node ${newNode} not found in old species`);
    console.log(species);
  }
}

const output: Species[] = [];

for (const species of oldSpecies) {
  const node = species.nodeId;
  if (newNodes.includes(node)) {
    const newAnimal = newSpecies[newNodes.indexOf(node)];
    try {
      const field = `name_${newLang}`;
      const newName = newAnimal[field];
      species[field] = newName;
    } catch (error) {
      console.log(`Field name_${newLang} not found in new species`);
      console.log(newAnimal);
    }
    output.push(species);
  } else {
    throw new Error(`Node ${node} not found in new ${kingdom}`);
  }
}

await Deno.writeTextFile(
  `data/${kingdom}_added.json`,
  JSON.stringify(output, null, 4)
);

console.log("Done");
