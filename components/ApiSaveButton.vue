<template>
  <div class="column is-narrow">
    <b-button type="is-primary" @click="saveApi">保存</b-button>
  </div>
</template>

<script>
export default {
  name: 'ApiSaveButton',
  methods: {
    saveApi() {
      this.$emit('clickSaveApi')
    }
  }
}
</script>
