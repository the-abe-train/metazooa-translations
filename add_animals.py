import json

new_lang = "tr"
kingdom = "animals"

with open(f"data/{kingdom}_{new_lang}.json", "r") as f:
    new_species = json.load(f)

with open(f"Species Lists/{kingdom}.json", "r") as f:
    old_species = json.load(f)

nodes = [species["nodeId"] for species in old_species]
new_nodes = [species["nodeId"] for species in new_species]

for new_node in new_nodes:
    if new_node not in nodes:
        species = new_species[new_nodes.index(new_node)]
        print(f"Node {new_node} not found in old species")
        print(species)


output = []

for species in old_species:
    node = species["nodeId"]
    if node in new_nodes:
        print(node)
        new_animal = new_species[new_nodes.index(node)]
        field = f"name_{new_lang}"
        new_name = new_animal[field]
        species[field] = new_name
        output.append(species)
    else:
        raise Exception(f"Node {node} not found in new animals")


with open(f"data/{kingdom}_added.json", "w") as f:
    json.dump(output, f, indent=4, ensure_ascii=False)

print("Done")
