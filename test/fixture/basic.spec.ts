import { describe, expect, test } from 'vitest'
import jsonFusion from '../../src'

const mergedJson = {
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
        name: 'item 1',
        price: 100
      },
      {
        id: 2,
        name: 'item 2',
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
        quantity: 2
      }
    ]
  },
  users: {
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

describe('fixture: basic', () => {
  test.only('simple usage', async () => {
    const resultRaw = await jsonFusion('basic')
    const result = JSON.parse(resultRaw)
    expect(result).toEqual(mergedJson)
  })

  test('fusion all json', async () => {
    const resultRaw = await jsonFusion({
      cwd: './basic'
    })

    const result = JSON.parse(resultRaw)
    expect(result).toEqual(mergedJson)
  })

  test('fusion all json with ignore', async () => {
    const resultRaw = await jsonFusion({
      cwd: './basic',
      ignore: 'users.json'
    })

    const result = JSON.parse(resultRaw)
    expect(result).toEqual({
      ...mergedJson,
      users: undefined
    })
  })
})
