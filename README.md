# json-fusion

`json-fusion` is a Node.js library designed to streamline the process of loading, merging, and reflecting directory hierarchies in JSON files. With `json-fusion`, you can consolidate information scattered across different JSON files, and reflect your filesystem's structure directly in your data, all with just a few lines of code.

Moreover, `json-fusion` provides a special handling for `index.json` files. The contents of `index.json` files are expanded directly into the parent directory's key, rather than creating a separate index key. This allows more intuitive organization of your JSON files.

## Features

- Load all JSON files from a specified directory
- Merge multiple JSON objects into one
- Incorporate the directory hierarchy as keys in the resulting JSON object
- Special handling for `index.json` files, which are expanded directly under the parent directory's key

## Installation

```sh
npm install json-fusion
```

## Usage

Here's a basic example of how to use json-fusion:

### CommonJS

```cjs
const jsonFusion = require('json-fusion');

const path = './path/to/your/json/files';
const result = await jsonFusion(path);

console.log(result);
```

### ESModule

```mjs
import jsonFusion from 'json-fusion';

const path = './path/to/your/json/files';
const result = await jsonFusion(path);

console.log(result);
```

### Structure

Consider the following directory structure:

```plaintext
/path/to/your/json/files
├── config.json
├── users
│   ├── index.json
│   ├── john.json
│   └── jane.json
└── data
    ├── items.json
    └── purchases.json
```

Running `jsonFusion('./path/to/your/json/files')` would result in an object similar to:

```jsonc
{
  "config": {/** ./config.json */},
  "users": {
    /** index.json */
    "john": {/** ./users/john.json */},
    "jane": {/** ./users/jane.json */}
  },
  "data": {
    "items": {/** ./data/items.json */},
    "purchases": {/** ./data.purchases.json */}
  }
}
```

where `{/** */}` represents the contents of the corresponding JSON file.

## Contributing

see [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
