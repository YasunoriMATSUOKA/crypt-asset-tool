const ccxt = require('ccxt')

const allExchanges = () => ccxt.exchanges
const publicExchangeObject = (exchange) => {
  return new ccxt[exchange]({
    proxy: process.env.PROXY_URL
  })
}
const hasFetchMarkets = (exchange) => {
  return publicExchangeObject(exchange).has.fetchMarkets
}
const hasFetchTicker = (exchange) => {
  return publicExchangeObject(exchange).has.fetchTicker
}
const hasFetchOrderBook = (exchange) => {
  return publicExchangeObject(exchange).has.fetchOrderBook
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
    return await publicExchangeObject(exchange).fetchMarkets()
  } else {
    return []
  }
}
const filterJpyMarkets = (markets) => {
  return markets.length > 0
    ? markets.filter((market) => market.quote === 'JPY')
    : []
}
const marketsToTickerOptions = (markets) => {
  return markets.length > 0
    ? filterJpyMarkets(markets).map((market) => market.symbol)
    : []
}
const isValidCombinationOfExchangeAndTicker = async (exchange, ticker) => {
  const markets = await fetchMarkets(exchange)
  const jpyMarkets = filterJpyMarkets(markets)
  if (jpyMarkets.length > 0) {
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
    return await publicExchangeObject(exchange).fetchTicker(ticker)
  } else {
    return {}
  }
}

export default ({ app }, inject) => {
  inject('allExchanges', allExchanges)
  inject('publicExchangeObject', publicExchangeObject)
  inject('hasFetchMarkets', hasFetchMarkets)
  inject('hasFetchTicker', hasFetchTicker)
  inject('hasFetchOrderBook', hasFetchOrderBook)
  inject('hasEnoughMethods', hasEnoughMethods)
  inject('enoughMethodsExchanges', enoughMethodsExchanges)
  inject('jpyExchanges', jpyExchanges)
  inject('fetchMarkets', fetchMarkets)
  inject('filterJpyMarkets', filterJpyMarkets)
  inject('marketsToTickerOptions', marketsToTickerOptions)
  inject('fetchTicker', fetchTicker)
}
