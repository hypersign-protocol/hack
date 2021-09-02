export default{
    methods:{
    checkChainType () { 
        if (this.projectDetails.blockchainType){
           this.stepOneData.rules.push({
             id: 5,
             checked: false,
             text: "Share your Solana address",
             value:"",
             label: "Tezos Account Address",
             placeholder: "tz or kt",
             type: this.projectDetails.blockchainType
           })
        }
     },
    }
}
