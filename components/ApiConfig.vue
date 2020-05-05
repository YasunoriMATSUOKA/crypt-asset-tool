<template>
  <div>
    <div class="columns">
      <ExchangeSelector
        :exchange="exchange"
        @changeExchange="onChangeExchange"
      ></ExchangeSelector>
    </div>
    <div class="columns">
      <ApiKeyInput
        :api-key="apiKey"
        @changeApiKey="onChangeApiKey"
      ></ApiKeyInput>
      <ApiSecretInput
        :api-secret="apiSecret"
        @changeApiSecret="onChangeApiSecret"
      ></ApiSecretInput>
    </div>
    <div class="columns">
      <ApiSaveButton @clickSaveApi="onClickSaveApi"></ApiSaveButton>
    </div>
  </div>
</template>

<script>
import ExchangeSelector from '@/components/ExchangeSelector'
import ApiKeyInput from '@/components/ApiKeyInput'
import ApiSecretInput from '@/components/ApiSecretInput'
import ApiSaveButton from '@/components/ApiSaveButton'

export default {
  name: 'ApiConfig',
  components: {
    ExchangeSelector,
    ApiKeyInput,
    ApiSecretInput,
    ApiSaveButton
  },
  props: {
    exchange: {
      type: String,
      default: ''
    },
    apiKey: {
      type: String,
      default: ''
    },
    apiSecret: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedExchange: this.exchange,
      inputApiKey: this.apiKey,
      inputApiSecret: this.apiSecret
    }
  },
  methods: {
    onChangeExchange(selectedExchange) {
      this.selectedExchange = selectedExchange
    },
    onChangeApiKey(inputApiKey) {
      this.inputApiKey = inputApiKey
    },
    onChangeApiSecret(inputApiSecret) {
      this.inputApiSecret = inputApiSecret
    },
    async onClickSaveApi() {
      await this.$setApiKeyAndApiSecret(
        this.selectedExchange,
        this.inputApiSecret,
        this.inputApiSecret
      )
      const exchange = await this.$getApiKeyAndApiSecret(this.selectedExchange)
      this.$buefy.notification.open({
        message: `以下のAPI情報をローカルストレージに保存しました。${JSON.stringify(
          exchange
        )}`,
        type: 'is-success'
      })
    }
  }
}
</script>
