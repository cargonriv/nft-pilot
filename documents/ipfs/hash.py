from collections import OrderedDict
import hashlib
import json

img_hash_array = OrderedDict([])
full_prov = ""
i = 0

while i <= 3:
    hasher = hashlib.sha256(bytes(f"images/{i}.png", "utf-8")).hexdigest()
    full_prov = str(full_prov) + str(hasher)
    img_hash_array[i] = hasher
    # print(full_prov, '\n')
    i+=1 

provenance = hashlib.sha256(bytes(full_prov, "utf-8")).hexdigest()

print(json.dumps(img_hash_array))
print(provenance)