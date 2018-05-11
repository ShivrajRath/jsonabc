### JSON ABC

Sorts JSON object alphabetically. It supports nested objects, arrays and collections. Works offline and beautifies JSON object too.

#### Supports

- Beautifies JSON
- Sorts Plain Objects, Collections, Arrays
- Has offline supports
- IE9+ Support
- Mobile/ Tablet friendly
- Sorting plain arrays is optional

#### Example

It converts this

```json
{
	"object": {
		"b": 2,
		"a": 1,
		"d": 4,
		"c": 3
	},
	"array": ["d", "1", "c", "a", "b"],
	"collection": [{
			"b": 2,
			"a": 1,
			"d": 4,
			"c": 3
		}, {
			"__b1": 2,
			"__a2": 1,
			"__d3": 4,
			"__c4": 3
		},
		["d", "1", "c", "a", "b"]
	]
}
```

to this

```json
{
    "array": [
        "1",
        "a",
        "b",
        "c",
        "d"
    ],
    "collection": [
        [
            "1",
            "a",
            "b",
            "c",
            "d"
        ],
        {
            "a": 1,
            "b": 2,
            "c": 3,
            "d": 4
        },
        {
            "__a2": 1,
            "__b1": 2,
            "__c4": 3,
            "__d3": 4
        }
    ],
    "object": {
        "a": 1,
        "b": 2,
        "c": 3,
        "d": 4
    }
}
```

[JSON ABC](http://novicelab.org/jsonabc "JSON ABC")
