<style scoped>
input,
input:focus,
input:read-only {
  background: none;
  padding: 0px;
  outline: none !important;
  border: 0;
  box-shadow: none;
}
input::placeholder {
  opacity: 0;
}
input:read-only {
  background: none;
  padding: 0px;
  font-weight: bolder;
  color: grey;
  font-size: 17px;
  color: #494949;
  
}
label {
  font-weight: bold;
  text-align: left;
  display: block;
  text-transform: uppercase;
  font-size: 11px;
  color: rgb(58, 58, 58);

}
input::placeholder {
  color: rgb(171, 176, 199);
}
.avatar-upload {
  margin-top: 20px;
}

form {
  margin-top: 100px;
}

div.form > div {
  width: calc(50% - 50px);
  margin: 20px 0px;
}


@media screen and (max-width: 768px) {
 div.form  > div{
   width: 100%;
 }
}
</style>
<template>
  <div>
    <div>
      <form class="d-flex">
        <!-- <div class="avatar-upload">
          <label for="avatar">
            <div class="">
              <img width="100px" :src="stepTwoData.imgLink" />
            </div>
          </label>
          <input
            readonly
            v-on:change="stepTwoData.handleImageChange"
            type="file"
            accept="image/*"
            id="avatar"
            class="d-none"
          />
        </div> -->
        <div class="form d-flex flex-wrap justify-content-between">
          <div
            :class="[data.fullWidth ? 'w-100' : '']"
            v-for="(data, idx) in stepTwoData.formData"
            :key="idx"
          >
            <label class="form-label">{{ data.label }}</label>
            <input
              readonly
              v-bind:value="data.value"
              class="form-control"
              :placeholder="data.placeholder"
            />
          </div>

        

          <div class="w-100">
            <!--             
            <div class="d-flex align-items-end">
              <label>Applying for galaxy tier ?*</label>
              <div class="d-flex mx-5">
                <div>
                  <label for="galaxyTierYes">YES</label>
                  <input
                    disabled
                    id="galaxyTierYes"
                    name="galaxyTier"
                    type="radio"
                    class="form-control"
                  />
                </div>
                <div class="mx-3">
                  <label for="galaxyTierNo">NO</label>
                  <input
                    disabled
                    id="galaxyTierNo"
                    name="galaxyTier"
                    type="radio"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          --></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>


export default {
  name: "StepThree",
  props: {
    stepTwoData: {
      type: Object,
    },
  },
  data() {
    return {
      recaptchaSiteKey: "",
    };
  },

  mounted() {
    // console.log(this.$config);
    // console.log(this.stepTwoData);
  },
};
</script>
