# json-fusion

`json-fusion` is a Node.js library designed to streamline the process of loading, merging, and reflecting directory hierarchies in JSON files. With `json-fusion`, you can consolidate information scattered across different JSON files, and reflect your filesystem's structure directly in your data, all with just a few lines of code.

## Features

- Load all JSON files from a specified directory
- Merge multiple JSON objects into one
- Incorporate the directory hierarchy as keys in the resulting JSON object

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
│   ├── john.json
│   └── jane.json
└── data
    ├── items.json
    └── purchases.json
```

Running `jsonFusion('./path/to/your/json/files')` would result in an object similar to:

```jsonc
{
  "config": {/**  */},
  "users": {
    "john": {/**  */},
    "jane": {/**  */}
  },
  "data": {
    "items": {/** */},
    "purchases": {/** */}
  }
}
```

where `{/** */}` represents the contents of the corresponding JSON file.

## Contributing

see [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
