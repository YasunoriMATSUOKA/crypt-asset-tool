<template>
  <div class="column is-narrow">
    <b-button type="is-warning" @click="deleteApi">{{ buttonLabel }}</b-button>
  </div>
</template>

<script>
export default {
  name: 'ApiDeleteButton',
  data() {
    return {
      buttonLabel: '削除'
    }
  },
  methods: {
    deleteApi() {
      this.$emit('clickDeleteApi')
    }
  }
}
</script>
