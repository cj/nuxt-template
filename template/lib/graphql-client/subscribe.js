export default function (subscriptionQuery, { error, ...options }) {
  options.client = options.client || 'default'

  try {
    const name = subscriptionQuery.definitions[0].selectionSet.selections[0].name.value
    const subscription = this.clients[options.client].subscribe({
      query: subscriptionQuery,
      variables: options.variables,
    }).subscribe({
      next ({ [name]: { mutation, node: record, previousValues: previousRecord, updatedFields } }) {
        const method = mutation.toLowerCase()
        const data = { record, previousRecord, updatedFields, mutation }

        if (options[method]) options[method](data)
        if (options.changed) options.changed(data)
      },
      error (err) {
        if (error) error(err)
        else console.log(err)
      },
    })

    return subscription
  } catch (err) {
    if (error) error(err)
    else console.log(err)

    return null
  }
}
