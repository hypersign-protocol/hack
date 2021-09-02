<style scoped>
.selected-media-wrapper{
    border: 1px dashed;
    max-height: 100px;
    background-color: #f5f5f5;
    border-radius: 10px;

}
.card i{
    cursor: pointer;
}
.card{
    transition: all 0.5s;
}
.card i{
    margin-right: 4px;
}
.flash{
    background-color: #1FAA59;
    color: #fff; 
    animation: flash 0.4s cubic-bezier(1, 0, 0, 1);
}

.fa-minus-circle{
    font-size: 14px;
}
@keyframes flash {
    0%{
        opacity: 0;
      
    }
    100%{
        opacity: 1;
    }
}

</style>
<template>
  <div>
      <div v-if="addedSocialMedias.length" class="selected-media-wrapper d-flex p-2 mb-4" >
            <div :class="flash == idx ?  'flash card rounded m-1 p-1 d-flex flex-row align-items-center' : 'card rounded m-1 p-1 d-flex flex-row align-items-center'" v-for="(socialMedia, idx) in addedSocialMedias" :key="idx">
                <span class="mr-2 text-capitalize"><i :class="socialMedia.icon"></i>  {{socialMedia.media}}</span>
                <div class="ml-3" /><i @click="removeSocialMedia(idx)" class="fas fa-minus-circle"></i>
            </div>
      </div>

       <!-- <b-form-select v-model="selectedSocialMedia"    text-field="label"  :options="socialOptions"></b-form-select> -->

       <select v-model="selectedSocialMedia"  class="form-select form-control">
             <option :key="idx" v-for="(option,idx) in socialOptions" :value="option.value" >
                 {{option.label}}
            </option>
        </select>

        <div v-if="selectedSocialMedia !==null" class="mt-4">
          
                 <div  v-for="field in selectedSocialMedia.fields" class="mb-3 text-left" :key="field.name">
                    <label :for="field.name" class="form-label"> {{field.placeholder}}: </label>
                    <input v-model="field.value" :type="field.type" :placeholder="field.placeholder" :id="field.name" class="form-control" />
                </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button @click="handleSocialMediaAdd(selectedSocialMedia)" class="btn btn-primary" type="button"> {{addedSocialMedias.includes(selectedSocialMedia) ? "Update" : "Add"}}</button>
                    
        </div>
      </div>

          
      </div>
  </div>
</template>

<script>
import notificationMixins from '../../mixins/notificationMixins';


export default {
  name: "SocialConfig",
  components: {  },
  data(){
      return{
       
        flash: null,

      
    }
      
  },
  props:{
      project: {
          type: Object
      },
       addedSocialMedias: {
      type: Array,
    },
    selectedSocialMedia: {
      type: Object
    },
    socialOptions:{
      type: Array
    }
  },
  methods: {
      removeSocialMedia(index){
         
        
          // console.log(this.addedSocialMedias[index].media);
          this.socialOptions.map(opt => {
            if(opt.value &&   opt.value.media == this.addedSocialMedias[index].media){
             
                opt.value.fields.map(field => {
                  field.value = ""
                })
            }
          })
          delete this.project.social[this.addedSocialMedias[index].media];
          this.addedSocialMedias.splice(index, 1) 
  

      },
      handleSocialMediaAdd(media){


        const obj = { isEnabled: true}
        
          if(!this.addedSocialMedias.includes(media)){
               if(media.fields[0].value == "" && !media.fields[0].optional){
                        return this.notifyErr(`Please fill in ${media.fields[0].placeholder}`)
                }
                
              if(media.fields[1].value == "" && !media.fields[1].optional){
                        return this.notifyErr(`Please fill in ${media.fields[1].placeholder}`)
                }    
            this.addedSocialMedias.push(media)  
             this.selectedSocialMedia = null
          } else{


  

            this.addedSocialMedias[this.addedSocialMedias.indexOf(media)].fields.forEach(field => {
                if(field.value == "" && !field.optional){
                    return this.notifyErr(`Please fill in ${field.placeholder}`)
                }
                
            })
          

            this.flash = this.addedSocialMedias.indexOf(media)

           
          
            setTimeout(() => {
                this.flash =  null
            }, 500)
          }

          this.addedSocialMedias[this.addedSocialMedias.indexOf(media)].fields.map(field => {
                obj[field.name] = field.value
             }) 



         
         

        this.project.social = { ...this.project.social, [media.media] :obj};

        // console.log("PROJECT", this.project)
       

      },
  },

  mixins: [notificationMixins]

};
</script>

