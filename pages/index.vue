<template>
  <div>
    <ExchangeSelector
      :exchange="exchange"
      @changeExchange="onChangeExchange"
      @initExchangeOptions="onInitExchangeOptions"
    ></ExchangeSelector>
  </div>
</template>

<script>
import ExchangeSelector from '@/components/ExchangeSelector'

export default {
  name: 'HomePage',
  components: {
    ExchangeSelector
  },
  data() {
    return {
      exchange: 'zaif',
      exchangeOptions: []
    }
  },
  methods: {
    onChangeExchange(selectedExchange) {
      this.exchange = selectedExchange
    },
    onInitExchangeOptions(exchangeOptions) {
      this.exchangeOptions = exchangeOptions
    }
  }
}
</script>
