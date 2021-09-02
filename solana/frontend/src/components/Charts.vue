<template>
  <div class="row">
    <div class="col-md-12 card" style="border-radius: 5px; padding: 35px; margin-top: 10px;">
      <vc-donut
        background="white"
        foreground="#60c860"
        :size="300"
        unit="px"
        :thickness="30"
        has-legend
        legend-placement="top"
        :sections="sections"
        :total="totalAvailable"
        :start-angle="0"
        :auto-adjust-text-size="true"
        @section-click="handleSectionClick"
      >
        <h1>{{ unused }}</h1>
      </vc-donut>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalAvailable: 0,
      totalUsed: 0,
      unused: 0,
      user: {},
      usage: {},
      sections: [{ label: "Requests consumed", value: 0, color: "#ed5c5c" }],
      authToken: localStorage.getItem("authToken"),
    };
  },
  async created() {

    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };


    // this.fetchPlan();
    
    
    await this.fetchSubscription();
    
    this.totalAvailable = this.usage["totalAvailable"];
    this.totalUsed = this.usage["totalUsed"];
    this.unused = this.totalAvailable - this.totalUsed;
    this.sections[0].value = this.totalUsed;

    // const subscriptionsInStorage = localStorage.getItem("subscriptions");
    // if(subscriptionsInStorage){
    //   const parsedSub = JSON.parse(subscriptionsInStorage)
      
    //   console.log({
    //     avl : this.totalAvailable,
    //     usd: this.totalUsed,
    //     sec: this.sections[0].value
    //   })
    // }    
  },
  methods: {
    handleSectionClick(section, event) {
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
        this.usage = json["usage"];
        // localStorage.setItem("subscriptions", JSON.stringify(json));
        // this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    
  },
};
</script>