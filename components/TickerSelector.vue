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
    tickerOptions() {
      return this.$marketsToTickerOptions(this.markets)
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
      this.isLoading = true
      this.markets = await this.$fetchMarkets(this.exchange).catch((error) => {
        this.isLoading = false
        this.$buefy.notification.open({
          duration: 5000,
          message: `fetchMarkets failed in TickerSelector component! ${error}`,
          position: 'is-bottom-right',
          type: 'is-danger',
          hasIcon: true
        })
        return []
      })
      this.isLoading = false
    }
  }
}
</script>
