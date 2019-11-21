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
    async created() {
      let wx = await this.$wx(['chooseImage'])
      wx.chooseImage({
        success(res) {
          alert(JSON.stringify(res))
        },
        fail({errMsg}) {
          alert(errMsg)
        }
      })
    }
  }
</script>