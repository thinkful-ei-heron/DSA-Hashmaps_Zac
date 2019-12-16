# Zac's DSA Hashmaps assignment

## 1) Create a HashMap class
- Length is 9, 9 items were mapped, but there were 11 items to be mapped.
- When retrieving keys that were duplicately mapped, it gets the most recent because the values were overwritten. This is why the length is shorter than the number of keys mapped.
- The capacity is 24 because when a new key is hashed while the map is at its set capacity ratio, a larger map is allocated and re-hashed.

## 2) WhatDoesThisDo
- The output will be 20; 10; because in each map the same key is being hashed twice, so in each case there is one key in the map with whichever value was set last.

## 3) Demonstrate understanding of Hash maps
```
| 22 | 88 |  |  | 4 | 15 | 28 | 17 | 59 | 31 | 10 |

|  |    |    | 12 |  |  |    |  | 17 |
|  | 28 | 5  |    |  |  | 15 |  |    |
|  | 19 | 20 |    |  |  | 33 |  |    |
|  | 10 |    |    |  |  |    |  |    |
```