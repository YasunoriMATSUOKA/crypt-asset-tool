import Dexie from 'dexie'

const setExchange = async (id, apiKey, apiSecret) => {
  const cryptAssetToolDb = new Dexie('CryptAssetToolDatabase')
  cryptAssetToolDb.version(1).stores({ exchanges: '&id,apiKey,apiSecret' })
  await cryptAssetToolDb.exchanges
    .put({
      id,
      apiKey,
      apiSecret
    })
    .catch((error) => {
      alert(error.stack || error)
    })
}
const deleteExchange = async (id) => {
  const cryptAssetToolDb = new Dexie('CryptAssetToolDatabase')
  cryptAssetToolDb.version(1).stores({ exchanges: '&id,apiKey,apiSecret' })
  await cryptAssetToolDb.exchanges.delete(id).catch((error) => {
    alert(error.stack || error)
  })
}
const getExchange = async (id) => {
  const cryptAssetToolDb = new Dexie('CryptAssetToolDatabase')
  cryptAssetToolDb.version(1).stores({ exchanges: '&id,apiKey,apiSecret' })
  const allExchanges = await cryptAssetToolDb.exchanges
    .toArray()
    .catch((error) => {
      alert(error.stack || error)
    })
  return allExchanges.find((exchange) => exchange.id === id)
}

export default ({ app }, inject) => {
  inject('setExchange', setExchange)
  inject('deleteExchange', deleteExchange)
  inject('getExchange', getExchange)
}
