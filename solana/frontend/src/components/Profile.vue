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

.noBullet {
  list-style-type: none;
}

.title {
  color: grey;
  font-size: 18px;
}
.dot {
  height: 15px;
  width: 15px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
  margin-top: 5px;
  float: right;
}

.tile {
  font-size: xxx-large;
  background: aliceblue;
  border-bottom: 1px solid #8080802b;
}
.fVal {
  font-size: small;
  color: gray;
  word-wrap: break-word;
}

.card {
  border-radius: 10px;
}
</style>

<template>
  <div>
    <div class="row" style="margin-top: 2%">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body tile">{{ projectCount }}</div>
          <div class="card-header">Events</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body tile">{{ schemaCount }}</div>
          <div class="card-header">Users</div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 5%">
      <div class="col-md-12 leftAlign">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <img
                  src="../assets/avatarUploadLabel.png"
                  alt="John"
                  style="width: 100%; height: 100%; opacity: 0.2"
                />
              </div>
              <div class="col-md-8" style="flex-wrap: wrap; padding: 20px">
                <p>DID</p>
                <p class="fVal">
                  <a target="_blank">{{ user.id }}</a>
                </p>
                <p>Email</p>
                <p class="fVal">{{ user.email }}</p>
                <p v-if="user.phoneNumber">
                  Phone Number: {{ user.phoneNumber }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  mounted() {},
  components: {},
  data() {
    return {
      active: 0,
      userKeys: [],
      appList: [],
      schemaCount: 0,
      projectCount: 0,
      user: {},
      authToken: localStorage.getItem("authToken"),
      projects: [],
    };
  },
  async created() {
    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };
    
    await this.fetchProjects();
   
  },
  methods: {
    async fetchProjects() {
      try {
        this.isLoading = true;

        if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project?onwer=${this.user.id}`;

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
        let investorCount = 0;
        // console.log("JSON", json)
        this.projects = json;
        this.projects.map((x) => {
          investorCount += x.investorsCount;
          x["whitelisting_link"] =
            window.location.origin + "/form?projectId=" + x._id;
          x["investors_link"] =
            window.location.origin + "/admin/investors?projectId=" + x._id;
        });

        this.projectCount = this.projects.length;
        this.schemaCount = investorCount;
        localStorage.setItem(
          "userProjects",
          JSON.stringify({
            projects: this.projects,
            count: this.projectCount,
          })
        );

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
