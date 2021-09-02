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

i {
  color: grey;
  padding: 5px;
}
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <div class="row" style="margin-top: 2%">
      <div
        class="col-md-4"
        style="text-align: center;"
        v-for="plan in plans"
        v-bind:key="plan._id"
      >
        <div class="card">
          <div class="card-header" style="padding-top: 10px">
            <h4>
              <b>{{ plan.planName }}</b>
            </h4>
            <p style="color: gray;">{{ plan.description }}</p>
          </div>
          <div class="card-body" style="text-align:center; min-height:280px">
            <p style="font-size:xx-large">${{ plan.price }}</p>
            <p>Upto <span style="font-weight: bold">{{ plan.totalNoOfRequests }}</span> requests</p>
            <p style="margin-top: 43%;">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="subscribe(plan['_id'])"
              >
                Subscribe
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-top: 2%;">
      <div class="col-md-12">
        <table  v-if="subscriptions.length" class="table table-bordered" style="background:#FFFF">
          <thead class="thead-light">
            <tr>
              <th>Subscription Id</th>
              <th>Subscription Date</th>
              <th>Plan Name</th>
              <th>Limit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in subscriptions" :key="row._d">
              <th>
                {{ row._id }}
              </th>
              <td>{{ new Date(row.subscriptionDate).toLocaleString()  }}</td>
              <td>{{ getPlanName(row.planId) }}</td>
              <td>{{ row.leftOverNoRequests }}</td>
              <td>{{ row.isActive ? "Active" : "Inactive" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import notificationMixins from "../mixins/notificationMixins";
import apiClientMixin from "../mixins/apiClientMixin";

export default {
  name: "Subscription",
  components: { Loading },

  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      isLoading: false,
      fullPage: true,
      plans: [],
      subscriptions: [],
      user: {},
    };
  },

  computed: {
    // a computed getter
  },

  created() {
    const usrStr = localStorage.getItem("user");
    if (usrStr) {
      this.user = {
        ...JSON.parse(usrStr),
      };
    }

    this.fetchPlan();
    // const plansInStorage = localStorage.getItem("plans");
    // if (plansInStorage) {
    // this.plans = JSON.parse(plansInStorage);
    // }

    this.fetchSubscription();

    // const subscriptionsInStorage = localStorage.getItem("subscriptions");
    // if(subscriptionsInStorage){
    //   const parsedSub = JSON.parse(subscriptionsInStorage)
    //   this.subscriptions = parsedSub ? parsedSub["subscriptions"] : [];
    // }else{

    // }
  },

  methods: {
    getPlanName(subPlanId) {
      const subPlan = this.plans.find((plan) => plan["_id"] === subPlanId);
      return subPlan ? subPlan["planName"] : "";
    },
    async fetchPlan() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/plan?authToken=${this.authToken}`;
        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();
        // console.log(json);
        this.plans = json;
        // localStorage.setItem("plans", JSON.stringify(json));
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchSubscription() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription?usage=true`;
        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();
        this.subscriptions = json["subscriptions"];
        // localStorage.setItem("subscriptions", JSON.stringify(json));
        // this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async subscribe(planId) {
      try {
        if (!planId) {
          return;
        }

        // console.log(planId);

        this.isLoading = true;

        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            planId,
          }),
          headers,
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        // this.subscriptions.push(json);
        this.fetchSubscription();

        // localStorage.setItem("subscriptions", JSON.stringify(this.subscriptions));

        this.notifySuccess("Your are subscribed. SubscriptionId = " + json._id);
        location.reload();
        // window.location.href = window.location.origin + "/app/admin/project";
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
  },

  mixins: [notificationMixins],
};
</script>
