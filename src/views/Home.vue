<template>
  <div class="home">
    <button @click="addCard({card_id})">领取团购券</button>
    <button @click="chooseCard({})">选择卡券</button>
    <!-- <button @click=""></button> -->
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'home',
    data() {
      return {
        card_id: 'pHOQC1GoSDsZ2TS9B_Gv3Z4I5pkg',
        card_type: 'GROUPON',
        location_id: 'xxx'
      }
    },
    async created() {
      this.wx = await this.$wx(['chooseCard', 'openCard', 'addCard'])
      // 查询card_id
    },

    methods: {
      async addCard({ card_id: cardId }) {
        let { timestamp, signature, nonce_str } = await this.$http.genCouponSignature({ card_id: cardId })
        this.wx.addCard({
          cardList: [{
            cardId,
            cardExt: `{
              "timestamp": "${timestamp}",
              "signature": "${signature}",
              "nonce_str": "${nonce_str}"
            }`
          }],
          // 需要添加的卡券列表
          success: function (res) {
            var cardList = res.cardList; // 添加的卡券列表信息
          }
        });
      },

      async chooseCard({ card_id: cardId, card_type: cardType, location_id: shopId }) {
        let { timestamp, cardSign, nonce_str: nonceStr } = await this.$http.genCouponCardSign({ cardId, cardType })
        this.wx.chooseCard({
          shopId,
          cardType,
          cardId,
          timestamp,
          nonceStr,
          cardSign,
          success: async res => {
            var cardList = JSON.parse(res.cardList); // 用户选中的卡券列表信息
            cardList = await Promise.all(cardList.map(async card => ({ cardId: card.card_id, code: await this.$http.decryptCode(card.encrypt_code) })))
            this.wx.openCard({ cardList })
          }
        });
      }
    }
  }
</script>