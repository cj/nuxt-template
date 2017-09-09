const _cloneDeep = require('lodash/cloneDeep')

export default async function (mutation, { variables, client = 'default' }) {
  try {
    const response = await this.clients[client].mutate({
      mutation,
      variables,
    })

    const name = mutation.definitions[0].selectionSet.selections[0].name.value
    const data = _cloneDeep(response.data[name])
    const count = data ? 1 : 0

    return {
      data,
      count,
      hasRecords: count > 0,
      loading: false,
      error: null,
    }
  } catch (error) {
    return {
      error,
      data: null,
    }
  }
}
