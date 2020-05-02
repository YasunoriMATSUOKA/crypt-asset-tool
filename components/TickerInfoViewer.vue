<template>
  <div class="column is-narrow">
    <b-field :label="tickerInfoViewerLabel">
      <b-table :data="tickerInfo" :loading="isLoading" mobile-cards>
        <template slot-scope="props">
          <b-table-column field="symbol" label="通貨">
            {{ props.row.symbol }}
          </b-table-column>
          <b-table-column field="last" label="最新価格" numeric>
            {{ props.row.last }}
          </b-table-column>
          <b-table-column field="ask" label="ASK" numeric>
            {{ props.row.ask }}
          </b-table-column>
          <b-table-column field="bid" label="BID" numeric>
            {{ props.row.bid }}
          </b-table-column>
          <b-table-column field="datetime" label="更新日時" numeric>
            {{ $jpDateTime(props.row.datetime) }}
          </b-table-column>
        </template>
      </b-table>
    </b-field>
  </div>
</template>

<script>
const ccxt = require('ccxt')

export default {
  name: 'TickerInfoViewer',
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
      tickerInfoViewerLabel: '価格情報',
      selectedExchange: this.exchange,
      selectedTicker: this.ticker,
      tickerInfo: [],
      isLoading: false,
      isValidExchangeAndTicker: false
    }
  },
  computed: {
    selectedExchangeObject() {
      return new ccxt[this.exchange]({
        proxy: process.env.PROXY_URL
      })
    }
  },
  watch: {
    async exchange() {
      await this.fetchTickerInfo()
    },
    async ticker() {
      await this.fetchTickerInfo()
    }
  },
  async created() {
    await this.fetchTickerInfo()
  },
  methods: {
    async fetchTickerInfo() {
      this.isLoading = true
      if (this.selectedExchange && this.selectedTicker) {
        const markets = await this.selectedExchangeObject.fetchMarkets()
        const hasTicker =
          markets.filter((market) => market.symbol === this.ticker).length > 0
        if (hasTicker) {
          this.isValidExchangeAndTicker = true
        } else {
          this.isValidExchangeAndTicker = false
          this.tickerInfo = []
          this.isLoading = false
          return
        }
      } else {
        this.isValidExchangeAndTicker = false
        this.tickerInfo = []
        this.isLoading = false
        return
      }
      this.tickerInfo[0] = await this.selectedExchangeObject
        .fetchTicker(this.ticker)
        .catch((error) => {
          this.$buefy.dialog.alert(error)
          this.tickerInfo = []
          this.isLoading = false
        })
      this.isLoading = false
    }
  }
}
</script>
