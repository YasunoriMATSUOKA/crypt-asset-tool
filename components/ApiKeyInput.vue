<template>
  <div class="column is-narrow">
    <b-field
      label="API Key"
      :type="{ 'is-danger': isEmptyApiKey }"
      :message="errorMessage"
    >
      <b-input v-model="inputApiKey" type="id"></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'ApiKeyInput',
  props: {
    apiKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputApiKey: this.apiKey,
      isEmptyApiKey: false
    }
  },
  computed: {
    errorMessage() {
      return this.isEmptyApiKey ? 'API Keyに値を入力してください' : ''
    }
  },
  watch: {
    inputApiKey() {
      this.isEmptyApiKey = this.inputApiKey === ''
      this.$emit('changeApiKey', this.inputApiKey)
    }
  }
}
</script>
