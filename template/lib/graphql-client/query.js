const _cloneDeep = require('lodash/cloneDeep')

export default async function (query, { variables, client = 'default' } = { variables: {} }) {
  try {
    const response = await this.clients[client].query({
      query: query,
      variables,
      fetchPolicy: 'network-only',
    })

    const name = query.definitions[0].selectionSet.selections[0].name.value
    const data = Array.isArray(response.data) ? [..._cloneDeep(response.data[name])] : _cloneDeep(response.data[name])
    const count = Array.isArray(response.data) ? data.length : (data ? 1 : 0)

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
      loading: false,
    }
  }
}
