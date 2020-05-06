<template>
  <div>
    <div class="columns">
      <ExchangeSelector
        :exchange="selectedExchange"
        @changeExchange="onChangeExchange"
      ></ExchangeSelector>
    </div>
    <div class="columns">
      <ApiKeyInput
        :api-key="inputApiKey"
        @changeApiKey="onChangeApiKey"
      ></ApiKeyInput>
      <ApiSecretInput
        :api-secret="inputApiSecret"
        @changeApiSecret="onChangeApiSecret"
      ></ApiSecretInput>
    </div>
    <div class="columns">
      <ApiSaveButton @clickSaveApi="onClickSaveApi"></ApiSaveButton>
      <ApiDeleteButton @clickDeleteApi="onClickDeleteApi"></ApiDeleteButton>
    </div>
  </div>
</template>

<script>
import ExchangeSelector from '@/components/ExchangeSelector'
import ApiKeyInput from '@/components/ApiKeyInput'
import ApiSecretInput from '@/components/ApiSecretInput'
import ApiSaveButton from '@/components/ApiSaveButton'
import ApiDeleteButton from '@/components/ApiDeleteButton'

export default {
  name: 'ApiConfig',
  components: {
    ExchangeSelector,
    ApiKeyInput,
    ApiSecretInput,
    ApiSaveButton,
    ApiDeleteButton
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
    clearApi() {
      this.inputApiKey = ''
      this.inputApiSecret = ''
    },
    async onClickSaveApi() {
      try {
        await this.$setExchange(
          this.selectedExchange,
          this.inputApiKey,
          this.inputApiSecret
        )
        const exchange = await this.$getExchange(this.selectedExchange)
        this.$buefy.notification.open({
          message: `API情報のローカルストレージへの保存に成功しました。${JSON.stringify(
            exchange
          )}`,
          type: 'is-success'
        })
      } catch (error) {
        this.$buefy.notification.open({
          message: `API情報のローカルストレージへの保存に失敗しました。${JSON.stringify(
            error
          )}`,
          type: 'is-danger'
        })
      }
    },
    async onClickDeleteApi() {
      try {
        await this.$deleteExchange(this.selectedExchange)
        this.$buefy.notification.open({
          message: `API情報のローカルストレージからの削除に成功しました。${this.selectedExchange}`,
          type: 'is-success'
        })
      } catch (error) {
        this.$buefy.notification.open({
          message: `API情報のローカルストレージからの削除に失敗しました。${JSON.stringify(
            error
          )}`,
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
