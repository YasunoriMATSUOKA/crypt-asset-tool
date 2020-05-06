<template>
  <div class="column is-narrow">
    <b-field :label="tickerInfoViewerLabel">
      <b-table :data="tickerInfo" :loading="isLoading" mobile-cards>
        <template slot-scope="props">
          <b-table-column field="symbol" :label="tableLabelSymbol">
            {{ props.row.symbol }}
          </b-table-column>
          <b-table-column field="last" :label="tableLabelLast" numeric>
            {{ props.row.last }}
          </b-table-column>
          <b-table-column field="ask" :label="tableLabelAsk" numeric>
            {{ props.row.ask }}
          </b-table-column>
          <b-table-column field="bid" :label="tableLabelBid" numeric>
            {{ props.row.bid }}
          </b-table-column>
          <b-table-column field="datetime" :label="tableLabelDatetime" numeric>
            {{ $jpDateTime(props.row.datetime) }}
          </b-table-column>
        </template>
      </b-table>
    </b-field>
  </div>
</template>

<script>
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
      tableLabelSymbol: '通貨',
      tableLabelLast: '最新価格',
      tableLabelAsk: 'ASK',
      tableLabelBid: 'BID',
      tableLabelDatetime: '更新日時',
      tickerInfo: [],
      isLoading: false,
      isValidExchangeAndTicker: false
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
      this.tickerInfo[0] = await this.$fetchTicker(
        this.exchange,
        this.ticker
      ).catch((error) => {
        this.isLoading = false
        this.$buefy.notification.open({
          duration: 5000,
          message: `fetchTickerInfo failed in TickerInfoViewer component! ${error}`,
          position: 'is-bottom-right',
          type: 'is-danger',
          hasIcon: true
        })
        return {}
      })
      this.isLoading = false
    }
  }
}
</script>
