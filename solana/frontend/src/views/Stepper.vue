<style scoped>
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}

.logo {
  width: 144px;
}

.fullbody {
  width: 100%;
}

.floatLeft {
  float: left;
}
.floatRight {
  float: right;
}
.card-header {
 
  padding: 0px;
}
.sm-tiles {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda71c;
  color: #888b8f;
}
.sm-tiles:hover {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda7a3;
  font-style: bold;
  color: #888b8f;
}

label {
  font-weight: bold;
}
.card {
  border-radius: 10px;
}
.paginationContainer {
  display: flex;
  list-style: none;

  justify-content: center;
}
.paginationContainer >>> li {
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 3px;
}
.paginationContainer >>> li.active {
  background-color: #007bff;
  color: #fff;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #007bff;
  background-color: #007bff;
  margin: 1px 0;
}
.d-stepper-header {
  display: none !important;
}
</style>
<template>
  <section class="stepper-section">
    <d-stepper
      :stepOneData="stepOneData"
      :stepTwoData="stepTwoData"
      :steps="steps"
      :initial-state="{ name: 'Carlos', users: [] }"
    >
      <template #fatal-error="{ errorMsg }">{{ errorMsg }}</template>
    </d-stepper>
  </section>
</template>

<script>
import StepOne from "./Stepper/StepOne.vue";
import StepTwo from "./Stepper/StepTwo.vue";
import DStepper from "./Stepper/DStepper.vue";
import StepThree from "./Stepper/StepThree.vue";
import StepFour from "./Stepper/StepFour.vue";
import config from "../config";

const avatarLabel = require("../assets/avatarUploadLabel.png");

export default {
  name: "Stepper",
  components: {
    DStepper
  },

  data() {
    return {
      stepOneData: {
         line1:
          "Please follow these instructions below to generate your Cred Credential",
        line2:
          "",

        rules: [
           {
            id: 0,
            text: "Your Hypersign Profile",
            checked: false,
            placeholder: "",
            hsProfile: {}
          },
          // {
          //   id: 1,
          //   text: "Follow us on Twitter",
          //   checked: false,
          // },
          // {
          //   id: 2,
          //   text: "Retweet and tag 3 friends",
          //   checked: false,
          //   showTweetInput: true,
          //   tweetUrl: "",
          // },
          // {
          //   id: 3,
          //   text: "Join our Telegram group ",
          //   checked: false,
          // },
          {
          id: 6,
          text: "Authorize your Cred profile",
          checked: false,
          placeholder: "Enter registered phone number (i.e 999999999)",
          phoneNumber: "",
          credProfile: {}
         },
        ],
      },

      stepTwoData: {
        line1:
           "Please follow these instructions below to get qualified for this program",
        line2:
          "You will need to complete all steps to get qualified.",
        imgLink: avatarLabel,
        formData: [
          {
            label: "Full Name*",
            placeholder: "Enter full name",
            value: "",
            id: "name",
            disabled: true,
          },
          {
            label: "Email Address*",
            placeholder: "someone@somewhere.com",
            value: "",
            id: "email",
            disabled: true,
          },
          {
            label: "Twitter Handle*",
            placeholder: "mytwitterhandle",
            value: "",
            id: "twitterHandle",
            errMsg: ""
          },
          {
            label: "Telegram Handle*",
            placeholder: "mytelegramhandle",
            value: "",
            id: "telegramHandle",
            errMsg: ""
          },
          {
            label: "Tezos Account Address" ,
            // : "ERC-20 Address (Do not add exchange address)*",
            placeholder: "tz or kt" ,
            // : "0x",
            fullWidth: true,
            value: "",
            id: "ethAddress",
            errMsg: ""
          },
        ],

      },

      steps: [
        {
          disabled: false,
          active: true,
          component: StepOne,
        },
        {
          disabled: false,
          active: false,
          component: StepTwo,
        },
        {
          disabled: false,
          active: false,
          component: StepThree,
        },
        {
          disabled: false,
          active: false,
          component: StepFour,
        },
      ],
    };
  },

 
  mounted() {
  
    const usrStr =
      localStorage.getItem("user") ||
      '{"name": "Hypersign", "email": "hypersign@email.com" }';
    const user = JSON.parse(usrStr);
    console.log(user)
    this.stepOneData.rules[0].hsProfile = user;

    this.stepTwoData.formData[0].value = user.name;
    this.stepTwoData.formData[1].value = user.email;

    
  },
};
</script>
