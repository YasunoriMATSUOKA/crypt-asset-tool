<template>
  <div>
    <div class="columns">
      <ExchangeSelector
        :exchange="selectedExchange"
        @changeExchange="onChangeExchange"
        @initExchangeOptions="onInitExchangeOptions"
      ></ExchangeSelector>
      <TickerSelector
        :exchange="selectedExchange"
        :ticker="selectedTicker"
        @changeTicker="onChangeTicker"
        @changeTickerOptions="onChangeTickerOptions"
        @changeMarkets="onChangeMarkets"
      ></TickerSelector>
    </div>
    <div class="columns">
      <TickerInfoViewer
        :exchange="selectedExchange"
        :ticker="selectedTicker"
      ></TickerInfoViewer>
    </div>
  </div>
</template>

<script>
import ExchangeSelector from '@/components/ExchangeSelector'
import TickerSelector from '@/components/TickerSelector'
import TickerInfoViewer from '@/components/TickerInfoViewer'

export default {
  name: 'ExchangeTickerUnit',
  components: {
    ExchangeSelector,
    TickerSelector,
    TickerInfoViewer
  },
  props: {
    exchange: {
      type: String,
      default: ''
    },
    ticker: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedExchange: this.exchange,
      selectedTicker: this.ticker,
      exchangeOptions: [],
      tickerOptions: [],
      markets: []
    }
  },
  methods: {
    onChangeExchange(selectedExchange) {
      this.selectedExchange = selectedExchange
    },
    onInitExchangeOptions(exchangeOptions) {
      this.exchangeOptions = exchangeOptions
    },
    onChangeTicker(selectedTicker) {
      this.selectedTicker = selectedTicker
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
