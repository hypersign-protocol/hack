<style scoped>
    .message{
        border: 1ps solid lightcyan;
        color: grey;
        background: lightgoldenrodyellow;
        padding: 10px;
        text-align: center;
        font-size:small;
    }
</style>

<template> 
    <p class="message">
        {{message}}
    </p>
</template>

<script>
export default {
    name: "Info",
    props: ['message'],
    mounted(){
        //console.log("The prop contain following message: " + this.message)
    }
}

</script>