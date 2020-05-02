<template>
  <div class="column is-narrow">
    <b-field :label="exchangeSelectorLabel">
      <b-select v-model="selectedExchange">
        <option v-for="option in jpyExchanges" :key="option" :value="option">
          {{ option }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
const ccxt = require('ccxt')

export default {
  name: 'ExchangeSelector',
  props: {
    exchange: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      exchangeSelectorLabel: '取引所',
      selectedExchange: this.exchange,
      allExchanges: ccxt.exchanges,
      jpyExchanges: ['bitbank', 'bitflyer', 'coincheck', 'liquid', 'zaif']
    }
  },
  computed: {
    exchangeOptions() {
      return this.allExchanges.filter((exchange) =>
        this.hasEnoughMethods(exchange)
      )
    }
  },
  watch: {
    selectedExchange() {
      this.$emit('changeExchange', this.selectedExchange)
    }
  },
  created() {
    this.$emit('initExchangeOptions', this.jpyExchanges)
  },
  methods: {
    exchangeObject(exchange) {
      return new ccxt[exchange]({
        proxy: process.env.PROXY_URL
      })
    },
    hasFetchMarkets(exchange) {
      return this.exchangeObject(exchange).has.fetchMarkets
    },
    hasFetchTicker(exchange) {
      return this.exchangeObject(exchange).has.fetchTicker
    },
    hasFetchOrderBook(exchange) {
      return this.exchangeObject(exchange).has.fetchOrderBook
    },
    hasEnoughMethods(exchange) {
      return (
        this.hasFetchMarkets(exchange) &&
        this.hasFetchTicker(exchange) &&
        this.hasFetchOrderBook(exchange)
      )
    }
  }
}
</script>
