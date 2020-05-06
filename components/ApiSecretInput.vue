<template>
  <div class="column is-narrow">
    <b-field
      label="API Secret"
      :type="{ 'is-danger': isEmptyApiSecret }"
      :message="errorMessage"
    >
      <b-input
        v-model="inputApiSecret"
        type="password"
        password-reveal
      ></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'ApiSecretInput',
  props: {
    apiSecret: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputApiSecret: this.apiSecret,
      isEmptyApiSecret: false
    }
  },
  computed: {
    errorMessage() {
      return this.isEmptyApiSecret ? 'API Secretに値を入力してください' : ''
    }
  },
  watch: {
    inputApiSecret() {
      this.isEmptyApiSecret = this.inputApiSecret === ''
      this.$emit('changeApiSecret', this.inputApiSecret)
    }
  }
}
</script>
