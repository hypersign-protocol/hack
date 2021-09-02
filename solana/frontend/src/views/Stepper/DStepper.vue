<template>
  <div class="d-stepper" style="background-color: #fff">
    <!---:style="`background-color: ${projectDetails.themeColor}; color: ${projectDetails.fontColor}`" --->
    <loading
      :active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <div
      class="header w-100 text-left"
      :style="
        `background-color: ${projectDetails.themeColor}; color: ${projectDetails.fontColor}`
      "
    >
      <div class="logo  d-inline-block" style="width:100%">
        <img :src="projectDetails.logoUrl" style="float:left" />
        <button @click="logout" class="btn" style="float:right">
          Logout
        </button>
      </div>
      <div class="text mx-auto  py-3 text-left" v-if="step != 3">
        <h4 class="mb-4">
          <span class="">{{ projectDetails.projectName }}</span>
          <!-- Token Sale  Registration -->
        </h4>
        <p class="my-0">
          {{ step == 0 ? stepOneData.line1 : stepTwoData.line1 }}
        </p>
        <p class="my-0">
          {{ step == 0 ? stepOneData.line2 : stepTwoData.line2 }}
        </p>
      </div>
    </div>

    <b-modal id="err-modal" title="BootstrapVue">
      <p v-for="errors in serverErrors" :key="errors.param" class="my-4">
        {{ errors.param }}: {{ errors.msg }}
      </p>
    </b-modal>

    <div v-if="showStepper" class="steps-container">
      <!-- <div
        v-if="step + 1 !== 4"
        class="steps-indicator d-flex align-items-center"
      >
        <p class="heading my-0">
          {{
            step + 1 == 1
              ? "Rules"
              : step + 1 == 2
              ? "Please fill out the following information"
              : "Please review your information before submission"
          }}
        </p>

        <p class="text-right ml-auto my-0">Step {{ step == 2 ? 2: step + 1 }} of 2</p>
      </div> -->
      <div class="steps">
        <div class="d-stepper-header d-flex justify-content-around">
          <div
            class="step-number-content text-center"
            :class="{ active: step == i }"
            v-for="(stepItem, i) in steps"
            :key="i"
          >
            <div
              class="step-number align-items-center justify-content-center mx-auto"
              :class="stepNumberClasses(i)"
            >
              <i v-if="step > i" class="fas fa-check"></i>
              <i
                v-else-if="step === i && fatalError"
                class="fas fa-exclamation"
              ></i>
              <span v-else>{{ i + 1 }}</span>
            </div>
            <div class="mt-1 small">{{ stepItem.name }}</div>
          </div>
        </div>

        <b-card
          class="my-0 border-0 overflow-hidden"
          bg-variant="light"
          no-body
          :class="{ 'border-danger': error, 'shake-error': shake }"
          v-loading="loading"
        >
          <b-card-body class="w-100 border-0 d-block">
            <div v-if="steps[step].icon" class="d-none d-sm-block"></div>
            <div>
              <!-- <h3>{{ step + 1 }}. {{ steps[step].name }}</h3>
            <p class="text-muted">{{ steps[step].desc }}</p> -->

              <div v-if="!fatalError">
                <transition :name="effect" mode="out-in">
                  <keep-alive>
                    <component
                      class="stepper-comp"
                      :projectDetails="projectDetails"
                      :stepOneData="stepOneData"
                      :stepTwoData="stepTwoData"
                      :store="store"
                      :state="state"
                      :step="step"
                      :setState="setState"
                      ref="step"
                      :is="stepComponent"
                      @loading="loadingAction"
                      @error="errorHandler"
                      @fatal-error="blockStepper"
                      @handleTwitterLogin="handleTwitterLogin"
                    />
                  </keep-alive>
                </transition>
              </div>
              <div v-else>{{ fatalErrorMsg }}</div>
            </div>
          </b-card-body>
        </b-card>

        <div class=" d-flex btn-container" v-if="!fatalError">
          <b-button
            v-if="step > 0 && step < steps.length - 1"
            variant="dark"
            :disabled="loading"
            class="text-primary back-btn"
            :style="
              `background-color: ${projectDetails.themeColor}; color: ${projectDetails.fontColor} !important; border-color: ${projectDetails.fontColor}`
            "
            @click="backStep"
          >
            <i class="fas fa-angle-double-left"></i> Back
          </b-button>

          <!-- <b-button
            v-if="step < steps.length - 1"
            variant="dark"
            class="ml-2 next-btn"
            @click="nextStep"
            :style="
              `background-color: ${projectDetails.themeColor}; color: ${projectDetails.fontColor} !important; border-color:${projectDetails.fontColor}`
            "
            :disabled="this.btnBlocked"
          >
            {{ step + 1 == 3 ? "Submit" : "Next" }}
          </b-button> -->

          <b-button 
            :style="
              `background-color: ${projectDetails.themeColor}; color: ${projectDetails.fontColor} !important; border-color:${projectDetails.fontColor}`
            "
          v-if="this.step==0" @click="confirmData()">
            Submit
          </b-button>


          <b-button
            v-if="steps[step].confirm"
            variant="success"
            class="ml-2"
            @click="$emit('confirm')"
            >{{ steps[step].confirm }}</b-button
          >
        </div>
      </div>
    </div>
    <div v-else class="steps-container no-stepper" style="height:100px">
      <h2 class="text-center w-100 text-danger">{{ errorMessage }}</h2>
    </div>

    <div
      class="footer"
      :style="
        `background-color: ${projectDetails.themeColor}; color: ${projectDetails.fontColor}`
      "
    >
      <!-- <h5 class="text-white my-2"> You personal data is secure and encrypted</h5> -->
      <div class="rule w-75 mx-auto" />
      <div class="d-flex justify-content-between align-items-center">
        <div class="footer-logo">
          <p class="m-0 text-white" style="font-weight: bold">Powered By</p>
          <a href="">
            <img width="80px" :src="require('../../assets/footerLogo.png')" />
          </a>
        </div>
        <div class="social d-flex ">
          <div class="mr-3">
            <a
              :href="`https://t.me/${projectDetails.telegramHandle}`"
              target="_blank"
            >
              <img
                width="30px"
                :src="require(`../../assets/telegramIcon.png`)"
              />
            </a>
          </div>
          <!-- <div class="mx-3">
            <a href="https://twitter.com/hypersignchain" target="_blank">
              <img width="30px" :src="require(`../../assets/instaIcon.png`)" />
            </a>
          </div> -->
          <div>
            <a
              :href="
                'https://twitter.com/' +
                  projectDetails.twitterHandle +
                  '?ref_src=twsrc%5Etfw'
              "
              target="_blank"
            >
              <img
                width="30px"
                :src="require(`../../assets/twitterIcon.png`)"
              />
            </a>
          </div>
        </div>
        <div class="logo-partner "></div>
      </div>
    </div>

    <vue-recaptcha
      v-if="step + 1 == 3"
      ref="recaptcha"
      size="invisible"
      :sitekey="$config.recaptchaSiteKey"
      :loadRecaptchaScript="true"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
    ></vue-recaptcha>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import VueRecaptcha from "vue-recaptcha";
import "vue-loading-overlay/dist/vue-loading.css";
import apiCall from "../../mixins/apiClientMixin";
import notificationMixin from "../../mixins/notificationMixins.js";
import fetchProjectDataMixin from "../../mixins/fetchProjectDataMixin";
import apiClinet from "../../mixins/apiClientMixin";
import checkTelegramAnnouncemntMixin from "../../mixins/checkTelegramAnnChannel";
import checkChainTypeMixin from "../../mixins/checkChainType";
import config from "../../config";

export default {
  name: "DStepper",

  components: { Loading, VueRecaptcha },
  props: {
    steps: { type: Array, default: () => [] },
    initialState: { type: Object, default: () => ({}) },
    stepOneData: {
      type: Object,
    },
    stepTwoData: {
      type: Object,
    },
  },

  data() {
    return {
      errorMessage: "No project found",
      showStepper: true,
      data: this.stepTwoData,
      store: {
        state: this.initialState,
        setState: this.setState,
        resetState: this.resetState,
      },
      step: 0,
      loading: false,
      error: false,
      fatalError: false,
      fatalErrorMsg: "",
      effect: "in-out-translate-fade",
      shake: false,
      isLoading: false,
      authToken: localStorage.getItem("authToken"),
      fullPage: true,
      projectDetails: {},
      serverErrors: [],
      hasTgVerfied: false,
      blockchainType: "",
      btnBlocked: false,
    };
  },

  async created() {
    if (
      !localStorage.getItem("user") ||
      !localStorage.getItem("projectDetails")
    ) {
      // console.log(this.$route.query)
      // console.log(this.$route.query.referrer)
      if (this.$route.query.referrer) {
        return this.$router.push(
          `/login/${this.$route.params.slug}?referrer=${this.$route.query.referrer}`
        );
      }
      return this.$router.push(`/login/${this.$route.params.slug}`);
    }

    let userDid;
    if (localStorage.getItem("user")) {
      userDid = JSON.parse(localStorage.getItem("user")).id;
    }

    if (localStorage.getItem("projectDetails")) {
      this.projectDetails = JSON.parse(localStorage.getItem("projectDetails"));
    }

    if (
      !this.projectDetails.projectStatus ||
      this.projectDetails.projectStatus === false
    ) {
      this.showStepper = false;
      this.errorMessage =
        "This event has ended, please contact the team to know about winners!";
      return;
    }

    this.checkTelegramAnnouncementChannel();
    this.checkChainType();
    this.checkBlockChainType();
    this.checkIfAlreadyFilled(userDid);
  },

  mounted() {
    this.data =
      this.step == 0 || this.step == 0 ? this.stepOneData : this.stepTwoData;
  },

  computed: {
    activeStep() {
      return this.steps[this.step];
    },
    stepComponent() {
      return this.steps[this.step].component;
    },
    iconClasses() {
      if (!this.activeStep.icon) return "";
      else if (/\s/.test(this.activeStep.icon)) return this.activeStep.icon;
      return `fas ${this.activeStep.icon}`;
    },
  },

  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("projectDetails");
      localStorage.removeItem("user");
      localStorage.removeItem("credentials");
      localStorage.removeItem("userData");

      localStorage.removeItem("telegramId");
      localStorage.removeItem("twitterId");
      localStorage.removeItem("investorPoints");

      if (this.$route.query.referrer) {
        this.$router.push(
          `/app/login/${this.$route.params.slug}?referrer=${this.$route.query.referrer}`
        );
      } else {
        this.$router.push(`/app/login/${this.projectDetails.slug}`);
      }
    },

    validateBlockchainAddress(blockchainType, value){
      if(!blockchainType){
        return this.notifyErr("blockchainType must be passed")
      }

      if(!value){
        return this.notifyErr(`${blockchainType} blockchain address can not be empty`)
      }

      let ethAddressValidate;

      if (blockchainType == "TEZOS") {
        ethAddressValidate =
          value.startsWith("tz") ||
          value.startsWith("kt");
      } else {
        ethAddressValidate = value.startsWith("0x");
      }

      if (!ethAddressValidate && blockchainType == "ETHEREUM") {
          return this.notifyErr("Please enter a valid Eth Address");
      } else if (!ethAddressValidate && blockchainType == "TEZOS") {
          return this.notifyErr("Please enter a valid Tezos  Address ");
      } 

      return ethAddressValidate;

    },

    checkBlockChainType() {
      this.blockchainType = this.projectDetails.blockchainType;

      if (this.blockchainType == "ETHEREUM") {
        const blockchainDataIndex = this.stepOneData.rules.findIndex(x => x.id == 5);
        this.stepOneData.rules[blockchainDataIndex].label = "ERC-20 Address";
        this.stepOneData.rules[blockchainDataIndex].placeholder = "0x";

        const ethAddress = this.stepTwoData.formData.find(
          (x) => x.id == "ethAddress"
        );
        ethAddress.label = "ERC-20 Address (Do not add exchange address)*";
        ethAddress.placeholder = "0x";
      }
    },

    async nextStep() {
      const step = this.step + 1;

      const data = step == 1 ? this.stepOneData : this.stepTwoData;

      let gotoNextPage = false;

      if (step == 1) {
        this.btnBlocked = true;

        //// blockchian field validation id = 5
        let blockchainValidated = false;
        const blockchainDataIndex = data.rules.findIndex(x => x.id == 5);
        console.log(blockchainDataIndex)
        if(blockchainDataIndex) {
          if(this.validateBlockchainAddress(this.blockchainType, data.rules[blockchainDataIndex].value)){
            data.rules[blockchainDataIndex].checked = true;
            blockchainValidated  =  true;

            this.stepTwoData.formData[4].value =  data.rules[blockchainDataIndex].value;
          }else{
            this.btnBlocked = false;
            return;
          }
        }
        ///

      
        const isAllChecked = true; //data.rules.every((rule) => rule.checked);
        const tweetFilled =
          data.rules[1].tweetUrl.trim().length !== 0 ? true : false;


        if (isAllChecked && tweetFilled) {
          //  console.log("PROJECT DETAILS", this.projectDetails);
          try {
            /// Doing tweeter verfication business
            const url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/verify`;
            let headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.authToken}`,
            };

            const body = {
              tweetUrl: data.rules[1].tweetUrl,
              userId: localStorage.getItem("twitterId"),
              tweetText: this.projectDetails.twitterPostTextFormat,
              needUserDetails: true,
              checkIfFollowed: true,
              sourceScreenName: this.projectDetails.twitterHandle,
            };

            const res = await apiClinet.makeCall({
              method: "POST",
              body: body,
              header: headers,
              url,
            });

            if (!res.data.user.followed.hasFollowed) {
              this.btnBlocked = false;
              return this.notifyErr(
                `Please Follow our twitter handle (@${res.data.user.followed.to})`
              );
            }

            /// Doing telegram verfication business
            const tgId = localStorage.getItem("telegramId");

            if (!tgId || tgId === "undefined") {
              this.btnBlocked = false;
              return this.notifyErr("Please authenticate Telegram");
            }

            const TGHandle = this.stepTwoData.formData.filter(
              (x) => x.id == "telegramHandle"
            )[0];
            TGHandle.value = tgId;
            TGHandle.disabled = true;
            this.hasTgVerfied = true;

            if (
              res.data.hasTweetUrlVerified &&
              res.data.user.followed.hasFollowed &&
              this.hasTgVerfied &&
              step == 1
            ) {
              const twitterHandle = this.stepTwoData.formData.filter(
                (x) => x.id == "twitterHandle"
              )[0];
              twitterHandle.value = res.data.user.screen_name;
              twitterHandle.disabled = true;

              this.btnBlocked = false;
              gotoNextPage = true;
              return this.slideToNextPage(gotoNextPage);
            }
          } catch (e) {
            console.log(e);
            this.btnBlocked = false;
            if (e.error) {
              return this.notifyErr(e.error);
            }
            if (!e.hasTweetUrlVerified) {
              return this.notifyErr("Please check your tweet URL");
            }
            if (e.errors) {
              return alert(JSON.stringify(e.errors));
            }
          }
        } else {
          this.notifyErr("Please follow all the rules, provide a tweet URL and add valid blockchain address");
          this.btnBlocked = false;
          return;
        }

        

      } else if (step == 2) {
        const isAllFilled = data.formData.every((input) => input.value.length);
        const twitterHandle = data.formData.filter((x) =>
          x.label.toLowerCase().includes("twitter")
        )[0];
        const telegramHandle = data.formData.filter((x) =>
          x.label.toLowerCase().includes("telegram")
        )[0];
        const ethAddress = data.formData.filter((x) =>
          x.id.toLowerCase().includes("eth")
        )[0];

        let ethAddressValidate;

        if (this.blockchainType == "TEZOS") {
          ethAddressValidate =
            ethAddress.value.startsWith("tz") ||
            ethAddress.value.startsWith("kt");
        } else {
          ethAddressValidate = ethAddress.value.startsWith("0x");
        }

        // console.log(this.blockchainType, ethAddress);

        let twitterHandleValidate = false;
        let telegramHandleValidate = false;

        if (
          twitterHandle.value.match(/^[a-zA-Z0-9_]{1,15}/) !== null &&
          twitterHandle.value.match(/^[a-zA-Z0-9_]{1,15}/)[0] ==
            twitterHandle.value
        ) {
          data.formData[2].errMsg = "";
          twitterHandleValidate = true;
        } else {
          data.formData[2].errMsg = "Please enter a valid username (without @)";
          twitterHandleValidate = false;
        }

        if (
          telegramHandle.value.match(/^[a-zA-Z0-9_]{5,15}/) !== null &&
          telegramHandle.value.match(/^[a-zA-Z0-9_]{5,15}/)[0] ==
            telegramHandle.value
        ) {
          data.formData[3].errMsg = "";
          telegramHandleValidate = true;
        } else {
          data.formData[3].errMsg =
            "Please Enter a valid Telegram Id (without @)";
          telegramHandleValidate = false;
        }

        if (!ethAddressValidate && this.blockchainType == "ETHEREUM") {
          data.formData[4].errMsg = "Please enter a valid Eth Address";
        } else if (!ethAddressValidate && this.blockchainType == "TEZOS") {
          data.formData[4].errMsg = "Please enter a valid Tezos  Address ";
        } else {
          data.formData[4].errMsg = "";
        }

        if (
          isAllFilled &&
          twitterHandleValidate &&
          telegramHandleValidate &&
          ethAddressValidate &&
          step == 2
        ) {
          gotoNextPage = true;
          return this.slideToNextPage(gotoNextPage);
        }
      } else if (step == 3) {
        return this.$refs.recaptcha.execute();
      }
    },

    resetState() {
      this.store.state = {
        ...this.initialState,
      };
    },
    setState(key, value) {
      this.store.state = {
        ...this.store.state,
        [key]: value,
      };
    },
    errorHandler(payload) {
      this.error = payload;
      this.shake = payload;
      setTimeout(() => {
        this.shake = !payload;
      }, 750);
    },
    blockStepper(msg) {
      this.resetParams();
      this.fatalErrorMsg = msg;
      this.fatalError = true;
    },
    resetParams() {
      this.error = false;
      this.loading = false;
      this.fatalErrorMsg = "";
      this.fatalError = false;
    },
    stepNumberClasses(i) {
      return {
        "bg-primary text-white": this.step === i && !this.fatalError,
        "bg-success text-white": this.step > i && !this.fatalerror,
        "bg-danger text-white": this.fatalError && this.step === i,
        "text-primary": this.step < i,
      };
    },

    slideToNextPage(gotoNextPage) {
      if (gotoNextPage) {
        if (!this.$refs.step.nextStep) return this.nextStepAction();

        if (this.$refs.step.nextStep()) {
          if (!this.loading) {
            this.nextStepAction();
          }
        }
      }
    },

    nextStepAction() {
      this.effect = "in-out-translate-fade";
      this.resetParams();
      
      const nextStep = this.step + 1;
            
      // skipping step2
      if(nextStep == 1){
        this.step = nextStep + 1;
        return;
      }

      if (this.step <= this.steps.length - 1) {
        this.step = nextStep;
      };
    },
    backStep() {
      this.effect = "out-in-translate-fade";
      this.resetParams();
      const previousStep = this.step - 1 ;

      // skipping step2
      if(previousStep == 1){
        this.step = previousStep - 1;
        return;
      }

      if (this.step >= 0) {
        this.step = previousStep;
      };
    },
    loadingAction(status) {
      this.loading = status;
      //if (!status) this.nextStepAction();
    },


    confirmData(){
      var userselection = confirm("Ar you sure you want to proceed?");
      if (userselection == true){
          this.getCredential();
      }
    },

    async getCredential(){
      try{
        
        this.isLoading =  true;
      let userCredentialData = {
        name: "",
        email: "",
        phoneNumber: "",
        trustScore: "",
        credCoin: "",
        blockchainAddress: ""
      }
      // userCredentialData = ...this.stepOneData.rules[0].hsProfile
        const { name, email } = this.stepOneData.rules[0].hsProfile;
        const { phone, trust_score, coins } =  this.stepOneData.rules[1].credProfile;

        userCredentialData.name = name;
        userCredentialData.email = email;
        userCredentialData.phoneNumber = phone;
        userCredentialData.trustScore = trust_score;
        userCredentialData.credCoin = coins;
        userCredentialData.blockchainAddress = this.stepOneData.rules[2].value;
        console.log(userCredentialData);

        let url =  "https://stage.hypermine.in/whitelist/api/v1/cred/issue";  
                 //`${this.$config.studioServer.BASE_URL}api/v1/cred/issue`;
       

        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        // console.log(investor);

        const resp = await apiClinet.makeCall({
          url: url,
          method: "POST",
          body: userCredentialData,
          header: headers,
        });

        
      
        this.isLoading = false;
        this.slideToNextPage(true);
        this.step = 3;
        this.notifySuccess("Credential has been successfully issued to your email.");
        
      }catch(e){
        console.log(e.message);
        this.notifyErr(e.message)
      } finally{
        this.isLoading = false;
      }
      
    },
    async saveInvestor(data, recaptchaToken) {
      try {
        let investor = {};
        const did = JSON.parse(localStorage.getItem("user")).id;
        // const did = "nsjdnfkdsnf34234"

        this.isLoading = true;

        // BUILDING UP THE INVESTOR OBJECT, TO SEND TO API
        for (let i in data) {
          investor[data[i].id] = data[i].value;
        }

        if (localStorage.getItem("projectDetails")) {
          investor.projectId = JSON.parse(
            localStorage.getItem("projectDetails")
          )._id;
        }

        investor.did = did;

        investor.tweetUrl = this.stepOneData.rules[1].tweetUrl;
        investor.hasJoinedTGgroup = true;
        investor.hasTwitted = true;

        let url = `${this.$config.studioServer.BASE_URL}api/v1/investor?rcToken=${recaptchaToken}`;
        //
        if (this.$route.query.referrer && this.$route.query.referrer != "") {
          url += `&referrer=${this.$route.query.referrer}`;
        }

        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        // console.log(investor);

        const resp = await apiClinet.makeCall({
          url: url,
          method: "POST",
          body: investor,
          header: headers,
        });

        

        this.isLoading = false;
        this.slideToNextPage(true);
        this.notifySuccess("Successfully Signed Up for whitelisting");
      } catch (err) {
        
        if (typeof err.errors == "object") {
          this.serverErrors = err.errors;
          this.$bvModal.show("err-modal");
        }
        this.notifyErr(err);
      } finally {
        // this.isLoading = false;
        // this.clear();
      }
    },

  
    async checkIfAlreadyFilled(userDid) {
      try {
        let idOrSlugForUrl = this.projectDetails._id;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor?did=${userDid}&projectId=${idOrSlugForUrl}`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        const res = await apiClinet.makeCall({
          url,
          header: headers,
          method: "GET",
        });
        // console.log(res);

        if (res.data && res.data.length > 0) {
          const points =
            res.data[0] && res.data[0].numberOfReferals
              ? res.data[0].numberOfReferals
              : 0;
          localStorage.setItem("investorPoints", points);
          this.step = 3;
        }
      } catch (e) {
        this.notifyErr(e.message);
        console.log(e);
      } finally {
        // this.isLoading = false;
        // this.clear();
      }
    },

    onCaptchaExpired: function() {
      // console.log("Captcha expired");
      this.$refs.recaptcha.reset();
    },
    formateDate(d) {
      return new Date(d).toLocaleString();
    },

    onCaptchaVerified: function(recaptchaToken) {
      const self = this;
      self.status = "submitting";
      self.$refs.recaptcha.reset();

      this.saveInvestor(this.stepTwoData.formData, recaptchaToken);
    },
  },

  mixins: [
    notificationMixin,
    fetchProjectDataMixin,
    checkTelegramAnnouncemntMixin,
    checkChainTypeMixin,
  ],
};
</script>

<style>
.btn {
  border: 1px solid #fff;
  bottom: 0;
  right: 0;
  background: whitesmoke;
  /* color: #fff; */
}

.d-stepper .d-stepper-header {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  display: none !important;
}

.d-stepper .d-stepper-header::before {
  position: absolute;
  width: 100%;
  height: 1px;
  background: #ddd;
  top: 20px;
  left: 0;
  content: " ";
}

.d-stepper .step-number {
  background: #e9e9e9;
  border-radius: 50%;
  text-align: center;
  height: 40px;
  width: 40px;
  display: flex;
}
.d-stepper .step-number-content {
  transition: transform 0.2s;
  z-index: 2;
  width: 68px;
}

.d-stepper .step-number-content div {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.d-stepper .step-number-content.active {
  transform: scale(1.25);
}

.in-out-translate-fade-enter-active,
.in-out-translate-fade-leave-active {
  transition: all 0.15s;
}
.in-out-translate-fade-enter,
.in-out-translate-fade-leave-active {
  opacity: 0;
}
.in-out-translate-fade-enter {
  transform: translateX(100px);
}
.in-out-translate-fade-leave-active {
  transform: translateX(-100px);
}

.out-in-translate-fade-enter-active,
.out-in-translate-fade-leave-active {
  transition: all 0.15s;
}
.out-in-translate-fade-enter,
.out-in-translate-fade-leave-active {
  opacity: 0;
}
.out-in-translate-fade-enter {
  transform: translateX(-100px);
}
.out-in-translate-fade-leave-active {
  transform: translateX(100px);
}
.card.my-4 {
  border: 0;
}

.footer {
  background-color: #494949;
}
.header {
  height: 220px;
}
.footer {
  padding: 10px 30px;
}
.footer .footer-logo p {
  font-size: 10px;
}
.header .logo {
  border-bottom-right-radius: 20px;
  height: 80px;
  /* width: 10% !important; */
  /* margin-left: 20px; */
  text-align: center;
  padding: 2px 0;
  margin-left: 5px;
  margin-top: 5px;
  padding-right: 10px;
}
.header .logo img {
  max-height: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
}
.header .text {
  width: 60%;
}
div.rule {
  border-bottom: 1px solid #ffffff;
  padding-top: 14px;
  margin-bottom: 20px;
}
.steps-container {
  min-height: 70vh;
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}

.steps-container.no-stepper {
  min-height: 60vh;
}
.steps-container .steps {
  width: 100%;
}
.steps-container .card {
  background-color: #fff !important;
}

.btn-container {
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 20px;
}
.btn-container button {
  border-radius: 25px;
  width: 120px;
  background-color: #494949;
  color: #ffffff !important;
}
.steps-indicator {
  position: absolute;
  top: 60px;
  font-weight: bolder;
  z-index: 100;
  width: 100%;
}
.steps-indicator .heading {
  font-size: 16px;
}

@media screen and (max-width: 768px) {
  .header {
    font-size: 14px;
    height: 220px;
  }
  .steps-container {
    width: 80%;
    min-height: 80vh;
  }
  .social {
    margin-left: auto;
  }
}

@media screen and (orientation: landscape) {
  .header {
    font-size: 14px;
    height: 220px;
  }
}

@media screen and (max-width: 516px) {
  .steps-indicator {
    top: 30px;
    flex-direction: column-reverse;
  }

  .steps-indicator .heading {
    margin-top: 10px !important;
  }
  div.form {
    font-size: 12px;
  }

  .logo img{
    width: 26%;
  }

  .text .my-0{
    font-size: 0.75em;
  }
}


@media screen and (min-height: 1070px) {
  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
