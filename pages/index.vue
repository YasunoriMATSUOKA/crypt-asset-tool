<template>
  <div>
    <ExchangeSelector
      :exchange="exchange"
      @changeExchange="onChangeExchange"
      @initExchangeOptions="onInitExchangeOptions"
    ></ExchangeSelector>
    <TickerSelector
      :exchange="exchange"
      :ticker="ticker"
      @changeTicker="onChangeTicker"
      @changeTickerOptions="onChangeTickerOptions"
      @changeMarkets="onChangeMarkets"
    ></TickerSelector>
  </div>
</template>

<script>
import ExchangeSelector from '@/components/ExchangeSelector'
import TickerSelector from '@/components/TickerSelector'

export default {
  name: 'HomePage',
  components: {
    ExchangeSelector,
    TickerSelector
  },
  data() {
    return {
      exchange: 'zaif',
      exchangeOptions: [],
      ticker: 'XEM/JPY',
      tickerOptions: [],
      markets: []
    }
  },
  methods: {
    onChangeExchange(selectedExchange) {
      this.exchange = selectedExchange
    },
    onInitExchangeOptions(exchangeOptions) {
      this.exchangeOptions = exchangeOptions
    },
    onChangeTicker(selectedTicker) {
      this.ticker = selectedTicker
    },
    onChangeTickerOptions(tickerOptions) {
      this.tickerOptions = tickerOptions
    },
    onChangeMarkets(markets) {
      this.markets = markets
    }
  }
}
</script>
