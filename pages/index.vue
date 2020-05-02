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
    <TickerInfoViewer :exchange="exchange" :ticker="ticker"></TickerInfoViewer>
  </div>
</template>

<script>
import ExchangeSelector from '@/components/ExchangeSelector'
import TickerSelector from '@/components/TickerSelector'
import TickerInfoViewer from '@/components/TickerInfoViewer'

export default {
  name: 'HomePage',
  components: {
    ExchangeSelector,
    TickerSelector,
    TickerInfoViewer
  },
  data() {
    return {
      exchange: 'bitbank',
      exchangeOptions: [],
      ticker: 'BTC/JPY',
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
