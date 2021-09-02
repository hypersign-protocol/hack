<template>
  <div>

<b-form-select v-model="blockChainType" :options="options"></b-form-select>

      
  </div>
</template>

<script>


export default {
  name: "BlockchainConfig",
  components: {  },
  props: {
    blockChainType: {
      type: String
    }
  },
  data(){
    return{
      selectedBlockChainType: this.blockChainType,
      options : [
        {text: "Select Blockchain type", value:null},
        {text: "ETHEREUM", value: "ETHEREUM"},
        {text: "TEZOS", value: "TEZOS"}
      ]
    }
    
  }
};
</script>

