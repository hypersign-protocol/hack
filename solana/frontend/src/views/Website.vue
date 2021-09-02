<template>
    <div class="body">
        <div class="row header">
            <div class="col-md-4">
                <img
                    :src="require('../assets/Fidato_logo.png')"
                    alt="logo"
                    width="120px"
                />
            </div>
            <!-- <div class="col-md-8">
                <button class="btn btn-default btn-lg">
                    <a href="/app" target="_blank">Try Now</a>
                </button>
            </div> -->
        </div>
        <div class="row content">
            <div class="col-md-12" style="">
                <h1 class="bold">FIDATO</h1>
                <div  class="typewriter"> 
                <h4>Build Resilient and Dependable Communities, Securely</h4>
                </div>
                <button  class="btn btn-default btn-lg" style="margin-top:2%">
                    <a href="/app" target="_blank">TRY THE APP NOW</a>
                </button>
            </div>
        </div>
        <!-- <div class="row footer">
            <div class="col-md-4">
                <span>Powered By</span>
                <img
                    :src="require(`../assets/footerLogo.png`)"
                    style="max-width: 100px;"
                />
            </div>
            <div class="col-md-8"></div>
        </div> -->
    </div>
</template>
<style scoped>


/* DEMO-SPECIFIC STYLES */
.typewriter h4 {
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  font-size: xx-large;
  animation: 
    typing 3.5s steps(30, end),
    blink-caret .9s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 40% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange }
}


    .body{
        background: whitesmoke;
        color: black;
        height: 100%;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        position: absolute;
    }

    .content{
        font-variant: all-petite-caps;
        text-align: center;
        margin-top: 18%;
    }

    .header{
        top: 10px;
        left: 10px;
        position: absolute;
    }

    .footer{
        bottom: 10px;
        left: 10px;
        position: absolute;
    }
    .content .bold{
        font-weight: bolder;        
        font-size: 700%;
    }

</style>