module.exports.mergedJson = {
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
