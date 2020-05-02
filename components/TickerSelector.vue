<template>
  <div class="column is-narrow">
    <b-field :label="tickerSelectorLabel">
      <b-select v-model="selectedTicker" :loading="isLoading">
        <option v-for="option in tickerOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
const ccxt = require('ccxt')

export default {
  name: 'TickerSelector',
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
      tickerSelectorLabel: '通貨',
      selectedTicker: this.ticker,
      markets: [],
      isLoading: false
    }
  },
  computed: {
    selectedExchangeObject() {
      return new ccxt[this.exchange]({
        proxy: process.env.PROXY_URL
      })
    },
    tickerOptions() {
      return this.markets.length > 0
        ? this.markets.map((market) => market.symbol)
        : []
    }
  },
  watch: {
    async exchange() {
      await this.fetchMarkets()
    },
    selectedTicker() {
      this.$emit('changeTicker', this.selectedTicker)
    },
    tickerOptions() {
      this.$emit('changeTickerOptions', this.tickerOptions)
    },
    markets() {
      this.$emit('changeMarkets', this.markets)
    }
  },
  async created() {
    await this.fetchMarkets()
  },
  methods: {
    async fetchMarkets() {
      if (this.exchange) {
        this.isLoading = true
        this.markets = await this.selectedExchangeObject
          .fetchMarkets()
          .catch((error) => {
            this.$buefy.dialog.alert(error)
            return []
          })
        this.isLoading = false
      } else {
        this.markets = []
      }
    }
  }
}
</script>
