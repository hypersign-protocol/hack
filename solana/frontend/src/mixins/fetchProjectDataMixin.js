import apiClinet from "../mixins/apiClientMixin";
export default{
    methods: {
          async fetchProjectData  ({isAuthTokenAvailable})   {
            try {
                
              this.isLoading = true;
              
              const idOrSlugForUrl = this.getProjectIdOrSlug();
              // console.log(idOrSlugForUrl)
              if (!idOrSlugForUrl) {
                throw new Error("Invalid projectId or projectSlug")
              }
                
              let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${idOrSlugForUrl}`;
              let headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.authToken}`,
              };
      
              if(!isAuthTokenAvailable){
                url = `${this.$config.studioServer.BASE_URL}api/v1/project/${idOrSlugForUrl}?isPublic=true`;
              }

              const resp =  await apiClinet.makeCall({method: "GET", url: url, header: headers})
      

              // I CAN SAFELY ACCESS resp.data here
            
              this.projectDetails = { ...resp.data };
      
              

      
                 this.projectDetails.twitterPostFormat = encodeURIComponent(
                   this.projectDetails.twitterPostFormat
                 );
                 this.projectDetails.twitterPostTextFormat = decodeURIComponent(
                    this.projectDetails.twitterPostFormat
                 )
             
              this.projectDetails.fromDate = this.formateDate(this.projectDetails.fromDate);
              this.projectDetails.toDate = this.formateDate(this.projectDetails.toDate);
              this.projectFetched = true;
    
              this.notifySuccess("Project is fetched. ProjectName " + this.projectDetails.projectName);
              return this.projectDetails;

            } catch (e) {
         
                // console.log(e);
              this.showStepper = false;
              this.errorMessage = e
              this.notifyErr(e);
            } finally {
              this.isLoading = false;
            }
          },

          getProjectIdOrSlug(){

            if(this.$route.params.projectSlug)   {
              return this.$route.params.projectSlug;
            }

          //   let idOrSlugForUrl;

          //   // console.log({
          //   //   projectId: this.projectId,
          //   //   projectSsluf : this.projectSlug
          //   // })
          //   if(!this.projectId || this.projectId == "" || this.projectId == null || this.projectId == "undefined"){
          //     // console.log("setting projectUrl as slug")
          //     // console.log(this.projectDetails);
          //     idOrSlugForUrl = this.projectDetails != "undefined" && this.projectDetails != {} ? this.projectDetails["_id"] : this.projectSlug;
          //     if(idOrSlugForUrl == "undefined" || !idOrSlugForUrl){
          //       idOrSlugForUrl = this.projectSlug;
          //     }
          //     // console.log("ProjectSlug = " + idOrSlugForUrl)
          //   }else{
          //     idOrSlugForUrl  = this.projectId;
          //   }

          //     // if(!this.projectSlug || this.projectSlug == "" || this.projectSlug == "undefined"){
          //     //   if (!this.projectId || this.projectId == "" || this.projectId == "undefined"){
          //     //     throw new Error("No projectId or project slug is set");
          //     //   }else{
          //     //     idOrSlugForUrl = this.projectId;
          //     //   }
          //     // }else{
          //     //   idOrSlugForUrl = this.projectSlug
          //     // }

          //     return idOrSlugForUrl;
          }
    }
}