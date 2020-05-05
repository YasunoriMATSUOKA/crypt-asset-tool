import Dexie from 'dexie'

const setApiKeyAndApiSecret = async (exchangeId, apiKey, apiSecret) => {
  const exchangeDb = new Dexie('ExchangeDatabase')
  exchangeDb.version(1).stores({ exchange: '&id,apiKey,apiSecret' })
  await exchangeDb.exchange
    .put({
      id: exchangeId,
      apiKey,
      apiSecret
    })
    .catch((error) => {
      alert(error.stack || error)
    })
}
const getApiKeyAndApiSecret = async (exchangeId) => {
  const exchangeDb = new Dexie('ExchangeDatabase')
  exchangeDb.version(1).stores({ exchange: '&id,apiKey,apiSecret' })
  const allExchanges = await exchangeDb.exchange.toArray().catch((error) => {
    alert(error.stack || error)
  })
  return allExchanges.find((exchange) => exchange.id === exchangeId)
}

export default ({ app }, inject) => {
  inject('setApiKeyAndApiSecret', setApiKeyAndApiSecret)
  inject('getApiKeyAndApiSecret', getApiKeyAndApiSecret)
}
