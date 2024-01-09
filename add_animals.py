import json

with open("data/animals_fr.json", "r") as f:
    new_animals = json.load(f)

with open("Species Lists/animals.json", "r") as f:
    old_animals = json.load(f)

nodes = [animal["node"] for animal in old_animals]
new_nodes = [animal["node"] for animal in new_animals]

for new_node in new_nodes:
    if new_node not in nodes:
        animal = new_animals[new_nodes.index(new_node)]
        print(f"Node {new_node} not found in old animals")
        print(animal)


output = []

for animal in old_animals:
    node = animal["node"]
    if node in new_nodes:
        new_animal = new_animals[new_nodes.index(node)]
        new_name = new_animal["name_fr"]
        animal["name_fr"] = new_name
        output.append(animal)
    else:
        raise Exception(f"Node {node} not found in new animals")


with open("data/animals_added.json", "w") as f:
    json.dump(output, f, indent=4, ensure_ascii=False)

print("Done")
