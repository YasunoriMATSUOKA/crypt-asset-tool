const ccxt = require('ccxt')

const allExchanges = () => ccxt.exchanges
const exchangeObject = (exchange) => {
  return new ccxt[exchange]({
    proxy: process.env.PROXY_URL
  })
}
const hasFetchMarkets = (exchange) => {
  return exchangeObject(exchange).has.fetchMarkets
}
const hasFetchTicker = (exchange) => {
  return exchangeObject(exchange).has.fetchTicker
}
const hasFetchOrderBook = (exchange) => {
  return exchangeObject(exchange).has.fetchOrderBook
}
const hasEnoughMethods = (exchange) => {
  return (
    hasFetchMarkets(exchange) &&
    hasFetchTicker(exchange) &&
    hasFetchOrderBook(exchange)
  )
}
const enoughMethodsExchanges = () => {
  return allExchanges().filter((exchange) => hasEnoughMethods(exchange))
}
const jpyExchanges = () => [
  'bitbank',
  'bitflyer',
  'coincheck',
  'liquid',
  'zaif'
]
const fetchMarkets = async (exchange) => {
  if (exchange && hasFetchMarkets(exchange)) {
    return await exchangeObject(exchange).fetchMarkets()
  } else {
    return []
  }
}
const marketsToTickerOptions = (markets) =>
  markets.length > 0 ? markets.map((market) => market.symbol) : []
const isValidCombinationOfExchangeAndTicker = async (exchange, ticker) => {
  const markets = await fetchMarkets(exchange)
  if (markets.length > 0) {
    return markets.filter((market) => market.symbol === ticker).length > 0
  } else {
    return false
  }
}
const fetchTicker = async (exchange, ticker) => {
  const tempIsValidExchangeAndTicker = await isValidCombinationOfExchangeAndTicker(
    exchange,
    ticker
  )
  if (tempIsValidExchangeAndTicker && hasFetchTicker(exchange)) {
    return await exchangeObject(exchange).fetchTicker(ticker)
  } else {
    return {}
  }
}

export default ({ app }, inject) => {
  inject('allExchanges', allExchanges)
  inject('exchangeObject', exchangeObject)
  inject('hasFetchMarkets', hasFetchMarkets)
  inject('hasFetchTicker', hasFetchTicker)
  inject('hasFetchOrderBook', hasFetchOrderBook)
  inject('hasEnoughMethods', hasEnoughMethods)
  inject('enoughMethodsExchanges', enoughMethodsExchanges)
  inject('jpyExchanges', jpyExchanges)
  inject('fetchMarkets', fetchMarkets)
  inject('marketsToTickerOptions', marketsToTickerOptions)
  inject('fetchTicker', fetchTicker)
}
