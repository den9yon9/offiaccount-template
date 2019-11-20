<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'home',
    components: {
    },
    async mounted() {
      let res = await this.$http.genJSSDKConfig({
        url: location.href
      })

      console.log(res)
    }
  }
</script>