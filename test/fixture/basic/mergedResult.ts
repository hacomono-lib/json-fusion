import deepMerge from 'deepmerge'

export const mergedJson = {
  config: {
    environment: 'production',
    database: {
      host: 'localhost',
      port: 5432
    }
  },
  data: {
    items: [
      {
        id: 1,
        name: 'Item 1',
        price: 100
      },
      {
        id: 2,
        name: 'Item 2',
        price: 200
      }
    ],
    purchases: [
      {
        userId: 1,
        itemId: 1,
        quantity: 1
      },
      {
        userId: 2,
        itemId: 2,
        quantity: 3
      }
    ]
  },
  users: {
    country: 'United States',
    language: 'English',
    jane: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com'
    },
    john: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    }
  }
}
Object.freeze(mergedJson)

export const mergedYaml = {
  users: {
    alice: {
      firstName: 'Alice',
      lastName: 'White',
      email: 'alice.white@example.com'
    },
    jack: {
      firstName: 'Jack',
      lastName: 'Black',
      email: 'black.jack@example.com'
    }
  }
}
Object.freeze(mergedYaml)

export const full = deepMerge(mergedJson, mergedYaml)

Object.freeze(full)

export const noSpreadJson = {
  config: mergedJson.config,
  data: mergedJson.data,
  users: {
    index: {
      country: mergedJson.users.country,
      language: mergedJson.users.language
    },
    jane: mergedJson.users.jane,
    john: mergedJson.users.john
  }
}

Object.freeze(noSpreadJson)
