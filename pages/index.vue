<template>
  <div>
    <ExchangeTickerUnit
      :exchange="exchange"
      :ticker="ticker"
    ></ExchangeTickerUnit>
  </div>
</template>

<script>
import ExchangeTickerUnit from '@/components/ExchangeTickerUnit'

export default {
  name: 'HomePage',
  components: {
    ExchangeTickerUnit
  },
  data() {
    return {
      exchange: 'bitbank',
      ticker: 'BTC/JPY'
    }
  }
}
</script>
