<template>
  <div>
    <b-field :label="exchangeSelectorLabel">
      <b-select v-model="selectedExchange">
        <option v-for="option in exchangeOptions" :key="option" :value="option">
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
      exchangeOptions: ccxt.exchanges
    }
  },
  watch: {
    selectedExchange() {
      this.$emit('changeExchange', this.selectedExchange)
    }
  },
  created() {
    this.$emit('initExchangeOptions', this.exchangeOptions)
  }
}
</script>
