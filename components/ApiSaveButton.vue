<template>
  <div class="column is-narrow">
    <b-button type="is-primary" @click="saveApi">{{ buttonLabel }}</b-button>
  </div>
</template>

<script>
export default {
  name: 'ApiSaveButton',
  data() {
    return {
      buttonLabel: '保存'
    }
  },
  methods: {
    saveApi() {
      this.$emit('clickSaveApi')
    }
  }
}
</script>
