<template>
  <div>
    <ApiConfig :exchange="exchange"></ApiConfig>
  </div>
</template>

<script>
import ApiConfig from '@/components/ApiConfig'

export default {
  name: 'ConfigPage',
  components: {
    ApiConfig
  },
  data() {
    return {
      exchange: 'bitbank'
    }
  }
}
</script>
