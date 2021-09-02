<style scoped>
.show-menu-text {
  margin-left: 30px;
  /* max-width: 210px; */
}

.list-group-item {
  text-align: left;
}
.list-group-item > .show-menu {
  position: absolute;
  height: 100%;
  width: 40px;
  top: 0px;
  left: 0px;
  /* background-color: rgba(51, 51, 51, 0.2); */
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.list-group-item > .right-menu {
  position: absolute;
  height: 100%;
  width: 40px;
  top: 0px;
  right: 0px;
  background-color: rgba(51, 51, 51, 0.2);
  /* color:#fff; */
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.list-group-item > .show-menu > i {
  /* position: absolute; */
  margin-left: 30%;
}
.list-group-item > .right-menu > i {
  /* position: absolute; */
  margin-left: 30%;
}

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
  background: aliceblue;
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
.checkbox {
  background-color: rgb(58, 58, 58);
  -moz-appearance: initial;
}
input[type="checkbox"]:before {
  position: relative;
  display: block;
  width: 11px;
  height: 11px;
  content: "";
  /* background-color: rgb(58, 58, 58); */
  background-color: rgb(58, 58, 58);
}

input[type="checkbox"]:after {
  position: relative;
  display: block;
  left: 2px;
  top: -11px;
  width: 7px;
  height: 7px;
  content: "";

  background-color: #fff;

  background-repeat: no-repeat;
  background-position: center;
}

input[type="checkbox"]:checked:after {
  background-size: 10px;
  background-position-y: 2px;
  background-color: rgb(58, 58, 58);
  background-image: url("data:image/png;base64,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");
}

input[type="checkbox"]:disabled:after {
  -webkit-filter: opacity(0.4);
}

input[type="checkbox"]:not(:disabled):checked:hover:after {
  background-size: 10px;
  background-position-y: 2px;
}

/* Large checkboxes */
input.large {
  height: 22px;
}

input.large[type="checkbox"]:before {
  width: 20px;
  height: 20px;
}

input.large[type="checkbox"]:after {
  top: -18px;
  left: 2px;
  width: 16px;
  height: 16px;
}

/* Custom checkbox */
input.large.custom[type="checkbox"]:checked:after {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGHRFWHRBdXRob3IAbWluZWNyYWZ0aW5mby5jb23fZidLAAAAk0lEQVQ4y2P4//8/AyUYwcAD+OzN/oMwshjRBoA0Gr8+DcbIhhBlAEyz+qZZ/7WPryHNAGTNMOxpJvo/w0/uP0kGgGwGaZbrKgfTGnLc/0nyAgiDbEY2BCRGdCDCnA2yGeYVog0Aae5MV4c7Gzk6CRqAbDM2w/EaQEgzXgPQnU2SAcTYjNMAYm3GaQCxNuM0gFwMAPUKd8XyBVDcAAAAAElFTkSuQmCC");
}

input.large.custom[type="checkbox"]:not(:disabled):checked:hover:after {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGHRFWHRBdXRob3IAbWluZWNyYWZ0aW5mby5jb23fZidLAAAAk0lEQVQ4y2P4//8/AyUYwcAD+OzN/oMwshjRBoA0Gr8+DcbIhhBlAEyz+qZZ/7WPryHNAGTNMOxpJvo/w0/uP0kGgGwGaZbrKgfTGnLc/0nyAgiDbEY2BCRGdCDCnA2yGeYVog0Aae5MV4c7Gzk6CRqAbDM2w/EaQEgzXgPQnU2SAcTYjNMAYm3GaQCxNuM0gFwMAPUKd8XyBVDcAAAAAElFTkSuQmCC");
}
.tweetUrlInput input {
  width: 100%;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid;
  padding: 2px 5px;
  outline: none;
}

a {
  cursor: pointer;
}

@media screen and (max-width: 990px) {
}

@media screen and (max-width: 768px) {
  ol {
    margin-top: 100px;
  }
  .tweetInput-container {
    width: 80% !important;
    margin: 10px !important;
  }
  .text-container {
    flex-direction: column !important;
  }
}

@media screen and (max-width: 516px) {
  .tweetUrlInput {
    flex-direction: column;
    width: 100%;
  }
  .tweetUrlInput input {
    width: 100% !important;
    margin: 10px 0;
    text-align: center;
  }
  .tweetInput-container {
    width: 100%;
  }
  .rules-container .text {
    width: 80%;
    text-indent: -10px;
  }
  .rules-container > .text {
    width: 80% !important;
  }

  /* .rules-container .links{
      width: 80%;
      margin: 0 !important;
    } */
}

.links {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  color: currentColor;
  line-height: 150px;
}
.links span {
  display: inline;
  display: inline-table;
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
  *margin-top: expression(
    this.offsetHeight < this.parentNode.offsetHeight ?
      parseInt((this.parentNode.offsetHeight - this.offsetHeight) / 2) + "px":
      "0"
  );
}
.lianchor {
  border-bottom: 1px solid #80808042;
  height: 40px;
  border-radius: 5px;
  border-right: 1px solid #80808042;
  border-top: 1px solid #80808042;
}

.social-tile {
  float: left;
  padding: 11px;
  color: grey;
  border-radius: 5px 0px 0px 5px;
}

.plus {
  float: right;
  color: grey;
}

.social-text {
  margin-left: 10px;
}

.twitter {
  color: rgb(255, 255, 255);
  background-color: rgb(29, 161, 242);
}
.telegram {
  color: rgb(255, 255, 255);
  background-color: rgb(0, 136, 204);
}
.default {
  color: rgb(255, 255, 255);
  background-color: #34bf49;
}

.pad-0 {
  padding: 0px;
  margin-top: 2%;
  border: 1px solid #8080804f;
  border-radius: 5px;
  text-align: left;
}
</style>
<template>
  <div>
    <loading
      :active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <div>
      <div class="list-group">
        <template v-for="(rule, idx) in stepOneData.rules">
          <a
            target="_blank"
            class="list-group-item d-flex justify-content-between list-group-item-action"
            :key="rule.id"
            v-b-toggle="'collapse-' + rule.id"
            variant="primary"
          >
            <!-- <template v-if="rule.id == 1" 
          >
          <span class="show-menu twitter">
            <i class="fab fa-twitter"></i>
          </span>
            <span class="show-menu-text">{{ rule.text }}</span>
             <span class="right-menu" >
              <i class="fas fa-chevron-down"></i>
              
            </span>   
          </template>
          <template v-if="rule.id == 2" 
          >
          <span class="show-menu twitter">
                  <i class="fab fa-twitter"></i>
          </span>
            <span class="show-menu-text">{{ rule.text }}</span>
             <span class="right-menu">
              <i class="fas fa-chevron-down"></i>
            </span>   
          </template>
          <template v-if="rule.id == 3" 
           
          >
          <span class="show-menu telegram">
            <i class="fab fa-telegram-plane"></i>
          </span>
            <span class="show-menu-text">{{ rule.text }}</span>
            <span class="right-menu">
              <i class="fas fa-chevron-down"></i>
            </span>          </template>
          <template v-if="rule.id == 4" 
          >
            <span class="show-menu telegram">
              <i class="fab fa-telegram-plane"></i>
            </span>
            <span class="show-menu-text">{{ rule.text }}</span>
            <span class="right-menu">
              <i class="fas fa-chevron-down"></i>
            </span>
          </template> -->

            <template v-if="rule.id == 0">
              <span class="show-menu" style="background: #80808021 none repeat scroll 0% 0%;">
                <!-- <i class="fab fa-twitter"></i> -->
                
                <img
                  src="https://i.ibb.co/w7zW8yB/Screenshot-from-2021-08-30-09-04-11.png"
                  width="40px"
                  height="34px"
                />
              </span>
              <span class="show-menu-text"> {{ rule.text }}</span>
              <span class="right-menu">
                <i class="fas fa-chevron-down"></i>
              </span>
            </template>

            <template v-if="rule.id == 6">
              <span class="show-menu" style="background: black;">
                <!-- <i class="fab fa-twitter"></i> -->
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.whizsky.com%2Fwp-content%2Fuploads%2F2018%2F12%2Fcred-image.jpg&f=1&nofb=1"
                  width="40px"
                  height="34px"
                />
              </span>
              <span class="show-menu-text">{{ rule.text }}</span>
              <span class="right-menu">
                <i class="fas fa-chevron-down"></i>
              </span>
            </template>

            <template v-if="rule.id == 5">
              <span class="show-menu" style="background: white">
                <!-- <i class="fas fa-cog"></i> -->
                
                 <img
                  src="https://i.ibb.co/xz2p1Z6/Screenshot-from-2021-08-30-09-45-24.png"
                  width="40px"
                  height="34px"
                />
              </span>
              <span class="show-menu-text">{{ rule.text }}</span>
              <span class="right-menu">
                <i class="fas fa-chevron-down"></i>
              </span>
            </template>
          </a>
          <b-collapse :key="rule.id" :id="'collapse-' + rule.id">
            <b-card
              style="margin-top:0px; margin-bottom: 10px; 
          border-radius: 2px; border-top: unset; color: grey"
            >
              <!-- <template v-if="rule.id == 1">
                <p class="card-text">
                  Click on the Twitter FOLLOW button to follow the page.
                </p>
                <b-button
                  size="sm"
                  class="btn-twitter twitter"
                  @click="
                    handleTwitterLogin(
                      'https://twitter.com/' +
                        projectDetails.twitterHandle +
                        '?ref_src=twsrc%5Etfw',
                      idx
                    )
                  "
                >
                  <i class="fab fa-twitter"></i>
                  Follow @{{ projectDetails.twitterHandle }}
                </b-button>
              </template> -->
              <!-- <template v-if="rule.id == 2">
                <p class="card-text">
                  Click on the RETWEET button to retweet and tag 3 of your
                  friends.
                </p>
                <p class="card-text">
                  Then copy the re-tweet url and provide it here.
                </p>
                <p style="margin-left:20%">
                  <b-button
                    size="sm"
                    style="float:left"
                    class="btn-twitter twitter"
                    @click="
                      handleTwitterLogin(
                        'https://twitter.com/intent/tweet?text=' +
                          projectDetails.twitterPostFormat,
                        idx
                      )
                    "
                  >
                    <i class="fab fa-twitter"></i> Retweet
                  </b-button>
                  <input
                    placeholder="Paset your tweet url"
                    v-model="stepOneData.rules[idx].tweetUrl"
                    type="url"
                    class="form-control w-50"
                  />
                </p>
              </template> -->
              <!-- <template v-if="rule.id == 3">
                <p class="card-text">
                  Click on the JOIN button to join the project's Telegram group.
                </p>
                <b-button
                  size="sm"
                  class="btn-twitter telegram"
                  @click="
                    handleTelegramLogin(
                      `https://t.me/${projectDetails.telegramHandle}`,
                      idx
                    )
                  "
                >
                  <i class="fab fa-telegram-plane"></i> Join @
                  {{ projectDetails.telegramHandle }}
                </b-button>
              </template> -->
              <!-- <template v-if="rule.id == 4">
                <p class="card-text">
                  Click on the Subscribe button to JOIN the project TG
                  Announcement Channel.
                </p>
                <b-button
                  size="sm"
                  class="btn-twitter telegram"
                  @click="
                    handleTelegramLogin(
                      `https://t.me/${projectDetails.telegramAnnouncementChannel}`,
                      idx
                    )
                  "
                >
                  <i class="fab fa-telegram-plane"></i> Join @
                  {{ projectDetails.telegramAnnouncementChannel }}
                </b-button>
              </template> -->
              <template v-if="rule.id == 5">
                <form>
                  <div class="form-group row">
                    <input
                      type="text"
                      v-model="rule.value"
                      class="col-md-6 form-control"
                      :placeholder="
                        `Enter Solano address. Make sure its not from any exchange`
                      "
                    />
                    <div class="col-sm-6">
                      <button
                        type="button"
                        class="btn default"
                        @click="connectSolana(idx)"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                </form>
              </template>
              <template v-if="rule.id == 6">
                <div v-if="!ifCredAuthenticated">
                  <form v-if="!ifOTPGenerated">
                    <div class="form-group row">
                      <input
                        type="text"
                        v-model="rule.phoneNumber"
                        class="col-md-6 form-control"
                        :placeholder="rule.placeholder"
                      />
                      <div class="col-sm-6">
                        <button
                          type="button"
                          class="btn default"
                          @click="handleCred('GENERATE_OTP', idx)"
                          style="background-color: black"
                        >
                          Authorize
                        </button>
                      </div>
                    </div>
                  </form>

                  <form v-else>
                    <div class="form-group row">
                      <input
                        type="text"
                        v-model="otp"
                        class="col-md-6 form-control"
                        placeholder="Enter 4 digit OTP"
                      />
                      <div class="col-sm-6">
                        <button
                          type="button"
                          class="btn default"
                          @click="handleCred('VERIFY_OTP', idx)"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div v-else>
                  <form v-if="ifCredAuthenticated && Object.keys(rule.credProfile).length != 0">
                    <!-- <div class="form-group row">
                      <label class="col-sm-6">Full Name</label>
                      <label class="col-sm-6 ">{{
                        rule.credProfile.first_name +
                          " " +
                          rule.credProfile.last_name
                      }}</label>
                    </div> -->
                    <div class="form-group row">
                      <label class="col-sm-6">Phone Number</label>
                      <label class="col-sm-6 ">{{
                        rule.credProfile.phone
                      }}</label>
                    </div>

                    <!-- <div class="form-group row">
                      <label class="col-sm-6">Email</label>
                      <label class="col-sm-6 ">{{
                        rule.credProfile.email
                      }}</label>
                    </div> -->

                    <div class="form-group row">
                      <label class="col-sm-6">Trust Score</label>
                      <label class="col-sm-6 ">{{
                        rule.credProfile.trust_score
                      }}</label>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-6">Cred Coins</label>
                      <label class="col-sm-6 ">{{
                        rule.credProfile.coins
                      }}</label>
                    </div>
                  </form>
                </div>
              </template>

              <template v-if="rule.id == 0">
                <form v-if="Object.keys(rule.hsProfile).length != 0">
                    <div class="form-group row">
                      <label class="col-sm-6">DID</label>
                      <label class="col-sm-6 ">{{
                       rule.hsProfile.id
                      }}</label>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-6">Name</label>
                      <label class="col-sm-6 ">{{
                        rule.hsProfile.name 
                      }}</label>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-6">Email</label>
                      <label class="col-sm-6 ">{{
                        rule.hsProfile.email
                      }}</label>
                    </div>
                  </form>
              </template>
            </b-card>
          </b-collapse>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import webAuth from "../../mixins/twitterLogin";
import notificationMixins from "../../mixins/notificationMixins";
import config from "../../config";
import apiClientMixin from "../../mixins/apiClientMixin";
// This components will have the content for each stepper step.
import Loading from "vue-loading-overlay";
export default {
  name: "StepOne",
  components: {
    Loading,
  },
  props: {
    stepOneData: {
      type: Object,
    },
    projectDetails: {
      type: Object,
    },
  },

  data() {
    return {
      showInput: true,
      urlToRedirectTo: "",
      telegramAuthDone: false,
      otp: "",
      ifOTPGenerated: false,
      token: "",
      isLoading: false,
      fullPage: true,
      ifCredAuthenticated: false,
    };
  },
  
  mounted() {
    const tgId = localStorage.getItem("telegramId");

    if (tgId && tgId != "undefined") {
      this.telegramAuthDone = true;
    }


    
  
  },

  methods: {
    connectSolana(idx) {
      /* console.log(this.getProvider()) */ let provider = this.getSolanaProvider();
      provider.connect();
      const _that = this;
      window.solana.on("connect", () => {
        _that.stepOneData.rules[idx].value = window.solana.publicKey.toString();
      });
      /* this.address = provider.publicKey.toString() */
    },
    getSolanaProvider() {
      if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          return provider;
        }
      }
      window.open("https://phantom.app/", "_blank");
    },

    handleInputShow() {
      this.showInput = true;
    },

    async handleCred(type, idx) {
      try {
        this.isLoading = true;

        if (!this.stepOneData.rules[idx].phoneNumber) {
          throw new Error("Enter phone number");
        }

        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        if (type === "GENERATE_OTP") {
          const url =
            "https://stage.hypermine.in/whitelist/api/v1/cred/generateOTP";
          

          const resp = await apiClientMixin.makeCall({
            url,
            body: {
              phoneNumber: this.stepOneData.rules[idx].phoneNumber,
            },
            method: "POST",
            header: headers,
          });

          console.log(resp);
          if (resp && resp.data && resp.data.token) {
            this.token = resp.data.token;
            this.ifOTPGenerated = true;
          } else {
            alert("Could not generate OTP");
          }
        } else if (type === "VERIFY_OTP") {
          if (this.token) {
            const url =
              "https://stage.hypermine.in/whitelist/api/v1/cred/verifyOTP";
            const resp = await apiClientMixin.makeCall({
              url,
              body: {
                otp: this.otp,
                token: this.token,
              },
              method: "POST",
              header: headers,
            });

            console.log(resp);

            if (resp && resp.data) {
              if (resp.data.existing_user) {
                this.stepOneData.rules[idx].credProfile = resp.data;
                console.log(
                  JSON.stringify(this.stepOneData.rules[idx].credProfile)
                );
                this.ifCredAuthenticated = true;
              } else {
                alert("User not registered");
                this.resetCred();
              }
            } else {
              alert("Could not verify the OTP");
              this.resetCred();
            }
          } else {
            alert("First generate Cred OTP");
            this.resetCred();
          }
        }
      } catch (e) {
        alert(e);
        this.resetCred();
      } finally {
        this.isLoading = false;
      }
    },

    resetCred() {
      this.ifCredAuthenticated = false;
      this.ifOTPGenerated = false;
      this.otp = "";
      this.toke = "";
    },

    handleTwitterLogin(urlToRedirect, idx) {
      if (!localStorage.getItem("twitterId")) {
        webAuth.popup.authorize(
          {
            connection: "twitter",
            owp: true,
          },
          (err, authRes) => {
            if (!err) {
              webAuth.client.userInfo(authRes.accessToken, (err, user) => {
                if (err) {
                  return alert("Something Went Wrong");
                }
                const twitterId = user.sub.split("|")[1];
                this.stepOneData.rules[idx].checked = true;
                localStorage.setItem("twitterId", twitterId);
                window.open(urlToRedirect, "_blank");
              });
            }
          }
        );
      } else {
        window.open(urlToRedirect, "_blank");
        this.stepOneData.rules[idx].checked = true;
      }
    },

    handleTelegramLogin(urlToRedirect, idx) {
      // console.log(urlToRedirect);
      if (!localStorage.getItem("telegamId")) {
        window.Telegram.Login.auth(
          { bot_id: config.telegramBotId, request_access: true },
          (data) => {
            if (!data) {
              return this.notifyErr("Authentication Failed! Try again");
            }

            this.stepOneData.rules[idx].checked = true;
            localStorage.setItem("telegramId", data.username);
            window.open(urlToRedirect, "_blank");
          }
        );
      } else {
        window.open(urlToRedirect, "_blank");
        this.stepOneData.rules[idx].checked = true;
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
