<style scoped>
.accordion > .card{
    overflow: inherit !important;
}
.b-sidebar > .b-sidebar-header{
  border: 1px solid #000 !important;
}
/* .card-header{
  background-color: transparent;
}
.card-header.accordin-header{
  background-color: #f8f9fa !important;
  border: none !important;
}
.b-sidebar.b-sidebar-right{
  background: #fff !important;
}
.accordion > .card{
  border: none !important;
  outline: none;
} */
</style>
<template>
  <div>

     <b-sidebar  backdrop width="500px" id="sidebar-right" :title="isProjectEditing ? 'Edit Event' : 'Create Event'" class="sidebarContainer background-transparent" right shadow>
              <div class=" px-3 py-2">
                 <div class="accordion" role="tablist">
                    <b-card  no-body class="mb-1 ">
                      <b-card-header  header-tag="header" class="p-1 border-0 accordin-header" role="tab">
                        <b-button block v-b-toggle.accordion-1 class="bg-transparent border-0 text-left text-primary" >General Configurations</b-button>
                      </b-card-header>
                      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <general-config  :isProjectEditing="isProjectEditing" :themeColor="themeColor" :fontColor="fontColor" :fontColorDefault="fontColorDefault" :themeColorDefault="themeColorDefault" :project="project" />
                          <!-- <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text> -->
                          <!-- <b-card-text>{{ text }}</b-card-text> -->
                        </b-card-body>
                      </b-collapse>
                    </b-card>

                      <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1 accordin-header" role="tab">
                          <b-button block v-b-toggle.accordion-2 variant="info" class="bg-transparent border-0 text-left text-primary" >Social Configurations</b-button>
                        </b-card-header>
                        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                          <b-card-body>
                              <social-config 
                              :addedSocialMedias="addedSocialMedias"
                              :selectedSocialMedia="selectedSocialMedia"

                              :socialOptions="socialOptions"
                               :project="project" />
                            <!-- <b-card-text>{{ text }}</b-card-text> -->
                          </b-card-body>
                        </b-collapse>
                      </b-card>

                      <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1 accordin-header" role="tab">
                          <b-button block v-b-toggle.accordion-3 variant="info" class="bg-transparent border-0 text-left text-primary" >Blockchain Configurations </b-button>
                        </b-card-header>
                        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                          <b-card-body>
                           <blockchain-congif :blockChainType="blockChainType" />
                          </b-card-body>
                        </b-collapse>
                      </b-card>
              
                </div>
                <button  class="btn btn-primary mt-3" type="button" @click="saveProject">Submit</button>
              </div>
              
    </b-sidebar>
      
  </div>
</template>

<script>
import BlockchainCongif from './BlockchainCongif.vue';
import GeneralConfig from './GeneralConfig.vue';
import SocialConfig from './SocialConfig.vue';


export default {
  name: "CreateProjectSlide",
  components: {SocialConfig, GeneralConfig, BlockchainCongif  },

  props:{
    project: {
      type: Object
    },
    themeColor: {
      type: String
    },
    fontColor: {
      type: String
    },
    themeColorDefault: {
      type: String
    },
    fontColorDefault: {
      type: String
    },
    blockChainType: {
      type: String
    },
    saveProject: {
      type: Function
    },
    addedSocialMedias: {
      type: Array,
    },
    selectedSocialMedia: {
      type: Object
    },
    socialOptions:{
      type: Array
    },
    isProjectEditing: {
      type: Boolean
    }
  },
 
  
};
</script>

