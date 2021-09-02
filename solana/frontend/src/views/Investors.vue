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
 .modal-text{
   font-size: 12px;
 }
 .projectSelector{
   min-width: 220px;
 }
 .lotteryImage{
    -webkit-filter: brightness(0) invert(1);
 filter: brightness(0) invert(1); 
 }
 .cta_btns{
   display: flex;
   align-items: center;
 }
 .cta_btns i{
    font-size: 22px;
    margin-left: 10px;
 }
 .paginationItem.active a{
   color: #fff;
 }
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>


  <b-modal  hide-footer id="modal-1" title="Lottery!">
    <p class="my-4 bg-info border rounded-lg p-2 text-white modal-text">Lottery is
        process of randomly selecting records
        Cless than total records). clicking
        on "Execute button', the
        lottery process begins, which may take time and screen might
        freeze. Once done you will set selected records in excel sheet.</p>

        <div class="d-flex mx-auto  justify-content-between px-4">
          <div class="bold">Total Records</div>
          <div class="bold">{{project.investors.length}}</div>
        </div>
        <div class="d-flex mx-auto  justify-content-between px-4 mt-4">
          <div class="bold">Enter number of records to get selected for lottery</div>
          <div class="bold">
             <input v-model="recordsForLottery" type="number" class="form-control" placeholder="No. of records" />
          </div>
        </div>
        
        <div class="mt-5 text-center">
          <button @click="handleLottery" type="button" class="btn btn-primary">Execute</button>
        </div>
  </b-modal>


    <div class="row " style="margin-top: 2%">
      <div class="d-flex justify-content-between col-md-12">


        <div class="projectSelector">  
          
           <b-form-select v-model="selectedProject"  @change="fetchProjectInvestors"  placeholder="Select an event"    value-field="_id" text-field="projectName" :options="projects"></b-form-select>
         
        </div>
        <div class="d-flex ml-auto align-items-center">
          <div>
            <b-form-input
              @input.native="handleTableSearch"
              v-model="tableSearch"
              placeholder="Search"
              type="search"
            ></b-form-input>
          </div>
          <div class="mx-3">
            <button @click="handleExport" :disabled='project.investors.length ? false : true' class="cta_btns btn btn-primary btn-md">Export All <i class="fas fa-file-export"></i></button>
          </div>
          <div>
            <button  :disabled='project.investors.length ? false : true' v-b-modal.modal-1 class="cta_btns btn btn-primary btn-md">Lottery <i class="fas fa-dharmachakra"></i></button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left">
        <div>
          <ve-table
            :border-x="true"
            :border-y="true"
            :border-around="true"
            :sort-option="sortOption"
            :columns="columns"
            :table-data="project.investors"
          />
        </div>
      </div>
    </div>
    <div class="d-flex mt-5">
      <paginate
        :pageCount="Math.ceil(this.project.count / this.perPage)"
        :clickHandler="paginateChange"
        :prevText="'Prev'"
        v-model="paginateValue"
        :nextText="'Next'"
        :containerClass="'paginationContainer'"
        :page-class="'paginationItem'"
      >
      </paginate>
      <div class="ml-auto">
        <b-form-select v-model="paginateValue"  :options="this.pageSelectDropdown" @change="paginateChange"></b-form-select>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Paginate from "vuejs-paginate";
import notificationMixins from '../mixins/notificationMixins';
import apiClientMixin from '../mixins/apiClientMixin';
import FileDownload from "js-file-download";
const issuedImgLink = require("../assets/issued-icon.png");

export default {
  name: "Investor",
  components: { Loading, Paginate },

  data() {
    return {
      paginateValue: 1,
      selectedProject: null,
      recordsForLottery: 0,
      issuedImgLink: issuedImgLink,
      cancelToken: undefined,
      sortOption: {
        sortChange: (params) => {
          // console.log("sortChange::", params);
          this.sortChange(params);
        },
      },
      tableSearch: "",
      perPage: 10,
      currentPage: 2,
      computed: {
        rows() {
          return this.items.length;
        },
      },

      pageSelectDropdown: [],

      columns: [
        { field: "name", key: "b", title: "Name", align: "left", sortBy: "" },
        {
          field: "email",
          key: "c",
          title: "Email",
          align: "left",
          sortBy: "asc",
          width: 10,
        },
        {
          field: "ethAddress",
          key: "d",
          title: "Blockchain Address",
          align: "left",

          // renderBodyCell: ({ row, column, rowIndex }, h) => {
          //   return (
          //     <span class="text-bold" style="color:#1890ff;">
          //       <a href={`https://etherscan.io/address/${row.ethAddress}`} target="_blank">
          //         {row.ethAddress}
          //       </a>
          //     </span>
          //   );
          // },
        },
        {
          field: "twitterHandle",
          key: "e",
          title: "Twitter Handle",
          align: "left",
          sortBy: "",

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold" style="color:#1890ff;">
                <a href={`https://twitter.com/${row.twitterHandle}`} target="_blank">
                  {row.twitterHandle}
                </a>
              </span>
            );
          },
        },
        {
          field: "telegramHandle",
          key: "f",
          title: "Telegram Handle",
          align: "left",
          sortBy: "",

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold" style="color:#1890ff;">
                <a href={`https://t.me/${row.telegramHandle}`} target="_blank">
                  {row.telegramHandle}
                </a>
              </span>
            );
          },
        },
        {
          field: "tweetUrl",
          key: "g",
          title: "Tweet Url",
          align: "left",

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span class="text-bold" style="color:#1890ff;">
                <a href={`${row.tweetUrl}`} target="_blank">Tweet</a>
              </span>
            );
          },
        },
        {
          field: "numberOfReferals",
          key: "h",
          title: "Score",
          align: "right",
          sortBy: "desc",
        }
      ],

      investor: {
        did: "did:hs:TEqweqweqwe12",
        email: "",
        name: "",
        ethAddress: "",
        twitterHandle: "",
        telegramHandle: "",
        hasTwitted: false,
        hasJoinedTGgroup: false,
        projectId: "",
        isVerfiedByHypersign: false,
        isVerificationComplete: false,
        tweetUrl: "",
        numberOfReferals: 0,
      },
      project: {
        count: 20,
        projectName: "",
        logoUrl: "",
        fromDate: "",
        toDate: "",
        ownerDid: "",
        investors: [],
      },

      projects: [],

      projectFetched: false,
      isDataSaved: false,
      active: 0,
      host: location.hostname,
      authToken: localStorage.getItem("authToken"),
      isLoading: false,
      fullPage: true,
    };
  },

  async mounted() {

    

  if(this.$route.query.projectId){
    this.selectedProjectId = this.$route.query.projectId;
    this.selectedProject = this.$route.query.projectId;
    this.investor.projectId = this.$route.query.projectId
    this.fetchProjectData(0, this.perPage)
  }

    const userProjectStr = localStorage.getItem("userProjects");
    const userProjectsData = JSON.parse(userProjectStr);
    this.projects = userProjectsData.projects;  
    this.projects.unshift({
      _id: null,
      projectName: "Select an event"
    })
  
 
  },


  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  
  methods: {
    async handleExport(){
      try{
       const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.project._id}?fetchInvestors=true&isExport=true`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        const res = await apiClientMixin.makeCall({method: "GET", url, header: headers, isFile: true})
        FileDownload(res.data, "Investor_Data.csv");
      }catch(e){
        console.log(e);
        this.notifyErr(e)
      
      }
    },
    async handleLottery(){
      if(this.recordsForLottery > this.project.investors.length || this.recordsForLottery <= 0){
        return this.notifyErr("No of records must be less or equal to total")
      }
      try{
        
          let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.project._id}/lottery?token=${this.authToken}&limitRecord=${this.recordsForLottery}`

          const headers = {

            "Authorization": `Bearer ${this.authToken}`,
          };

          const res = await apiClientMixin.makeCall({method:"GET", header: headers, url, isFile: true}) 
          FileDownload(res.data,  "Lottery.csv")

        }catch(e){
          console.log(e);
          this.notifyErr(e)
        }
      
    },
    sortChange(params) {
      this.project.investors.sort((a, b) => {
        if (params.name) {
          if (params.name === "asc") {
            return a.name.localeCompare(b.name);
          } else if (params.name === "desc") {
            return b.name.localeCompare(a.name);
          } else {
            return 0;
          }
        } else if (params.email) {
          if (params.email === "asc") {
            return a.email.localeCompare(b.email);
          } else if (params.email === "desc") {
            return b.email.localeCompare(a.email);
          } else {
            return 0;
          }
        } else if (params.did) {
          if (params.did === "asc") {
            return a.did.localeCompare(b.did);
          } else if (params.did === "desc") {
            return b.did.localeCompare(a.did);
          } else {
            return 0;
          }
        } else if (params.ethAddress) {
          if (params.ethAddress === "asc") {
            return a.ethAddress.localeCompare(b.ethAddress);
          } else if (params.ethAddress === "desc") {
            return b.ethAddress.localeCompare(a.ethAddress);
          } else {
            return 0;
          }
        } else if (params.twitterHandle) {
          if (params.twitterHandle === "asc") {
            return a.twitterHandle.localeCompare(b.twitterHandle);
          } else if (params.twitterHandle === "desc") {
            return b.twitterHandle.localeCompare(a.twitterHandle);
          } else {
            return 0;
          }
        } else if (params.telegramHandle) {
          if (params.telegramHandle === "asc") {
            return a.telegramHandle.localeCompare(b.telegramHandle);
          } else if (params.telegramHandle === "desc") {
            return b.telegramHandle.localeCompare(a.telegramHandle);
          } else {
            return 0;
          }
        }
      });
    },

    async handleTableSearch() {
      this.fetchProjectData(0, this.perPage);
    },
    async fetchProjectInvestors(e) {
      if(e){
        this.investor.projectId = e;
        await this.fetchProjectData(0, this.perPage);
      }
      
    },

    filterVerified(label) {
      // console.log(label);

      if (label == "onlyVerified") {
        this.project.investors = this.sourceData.investors.filter(
          (x) => x.isVerificationComplete
        );
      } else if (label == "onlyNotVerified") {
        this.project.investors = this.sourceData.investors.filter(
          (x) => !x.isVerificationComplete
        );
      } else {
        this.project = this.sourceData;
      }
    },

    filterIssued(label) {
      // console.log(label);

      if (label == "onlyIssued") {
        this.project.investors = this.sourceData.investors.filter(
          (x) => x.isVerfiedByHypersign
        );
      } else if (label == "onlyNotIssued") {
        this.project.investors = this.sourceData.investors.filter(
          (x) => !x.isVerfiedByHypersign
        );
      } else {
        this.project = this.sourceData;
      }
    },

    paginateChange(e) {
      if(typeof e == "number"){
        this.currentPage = e;
        this.paginateValue = e
      } else{
        this.currentPage = e.target.value;
        this.paginateValue = e
      }

      const skip = this.perPage * (this.currentPage - 1);

      this.fetchProjectData(skip, this.perPage);
    },

    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    formateDate(d) {
      return new Date(d).toLocaleString();
    },

    // async verifyInvestor(investor) {
    //   try {
    //     this.isLoading = true;

    //     const url = `${this.$config.studioServer.BASE_URL}api/v1/investor/${investor.did}?projectId=${this.investor.projectId}`;

    //     investor.hasJoinedTGgroup = true;
    //     investor.isVerificationComplete = true;
    //     investor.hasTwitted = true;

    //     if (investor["_id"]) delete investor["_id"];

    //     const headers = {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${this.authToken}`,
    //     };

    //     const resp = await fetch(url, {
    //       method: "PUT",
    //       body: JSON.stringify(investor),
    //       headers,
    //     });

    //     if (!resp.ok) {
    //       return this.notifyErr(resp.statusText);
    //     }

    //     const json = await resp.json();
    //     this.notifySuccess("Investor verified successfully");
    //   } catch (e) {
    //     this.notifyErr(e.message);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
    // async issueCredential(investor, idx) {
    //   try {
    //     this.isLoading = true;
    //     const url = `${this.$config.studioServer.BASE_URL}api/v1/investors/issue`;
    //     const body = {
    //       did: investor.did,
    //       projectId: this.investor.projectId,
    //     };
    //     const headers = {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${this.authToken}`,
    //     };

    //     const resp = await fetch(url, {
    //       method: "POST",
    //       body: JSON.stringify(body),
    //       headers,
    //     });

    //     if (!resp.ok) {
    //       return this.notifyErr(resp.statusText);
    //     }
    //     const json = await resp.json();
    //     this.notifySuccess(json.message);
    //     this.project.investors[idx].isVerfiedByHypersign = true;
    //   } catch (e) {
    //     this.notifyErr(e.message);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
    async fetchProjectData(skip, limit) {
      try {
        this.isLoading = true;

        if (!this.investor.projectId) throw new Error("No project found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.investor.projectId}?fetchInvestors=true&limit=${limit}&skip=${skip}&searchQuery=${this.tableSearch}`;
        // console.log(url);
        const headers = {
          "Content-Type": "application/json",
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

        this.project = { ...json };
        this.sourceData = { ...json };
        this.project.fromDate = this.formateDate(this.project.fromDate);
        this.project.toDate = this.formateDate(this.project.toDate);
        this.projectFetched = true;


        this.pageSelectDropdown = Array.from({length: Math.ceil(this.project.count / this.perPage)}, (_, i) => i + 1)

      
        this.notifySuccess(
          "Project is fetched. ProjectName " + json.projectName
        );


      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    formateDate(dateStr) {
      const d = new Date(dateStr);
      return d.toDateString();
    },
    async saveInvestor() {
      try {
        this.isLoading = true;

        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor`;
        let headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.investor),
          headers,
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        this.isDataSaved = true;
        this.notifySuccess("Your data is saved. Id = " + json._id);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
        this.clear();
      }
    },
    clear() {
      this.investor = {
        did: "did:hs:TEqweqweqwe12",
        email: "",
        name: "",
        ethAddress: "",
        twitterHandle: "",
        telegramHandle: "",
        hasTwitted: false,
        hasJoinedTGgroup: false,
        projectId: "606742855244b589bc100083",
      };
    },
  },

  mixins: [notificationMixins]
};
</script>
