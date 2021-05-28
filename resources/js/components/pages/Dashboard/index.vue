<template>
<div class="w-full position-relative" >

    <div class="area position-absolute top-0 left-0" >
        <img v-if="activeBackgroundImage" :src="activeBackgroundImage.image" alt="" class="background-project">
        <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>

        </ul>
    </div >
<div class=" w-75 m-auto ">
    <div class="d-flex justify-content-between mb-4 p-4">
       <div>
           <button type="button" class="btn btn-primary"  @click="signOut">Logout</button>
           <b-button class="mx-3 btn-danger" @click="showModal">Add User</b-button>
           <b-button class="mx-3 btn-danger" @click="openSettings">Settings</b-button>
           <b-button class="mx-3 btn-danger" @click="openSettingsLine">LINES</b-button>
           <b-button class="mx-3 btn-danger" @click="cleanMarginOfUsers">Clean</b-button>


       </div>
        <div class="d-flex align-items-center " >
            <span class="mr-4 font-weight-bold">Them Mode</span>
            <label class="switch">
                <input type="checkbox"
                       :value="darkMode"
                       @click="toggleCheckbox">
                <div class="slider round"></div>
            </label>
        </div>

    </div>

<h1>Total {{users && users.length}}</h1>
    <div class="ui  project-table position-relative"  >
<!--        <div v-if="activeBackgroundImageLine && activeBackgroundImageLine.image" class="position-absolute top-0 left-0 back-image" :style="{backgroundImage: 'url(images/' + activeBackgroundImageLine + ')', backgroundSize:'contain'}" ></div>-->

        <table
    :class="[darkMode ? 'table-dark main-table-dark' : 'table-light main-table-light', ' top-0 left-0 table main-table']"
    >
        <thead>
        <tr>
            <th scope="col" class="text-center">#</th>
            <th scope="col" class="text-center" >Name</th>
            <th scope="col" class="text-center" >Total</th>
            <th scope="col" class="text-center" >Marge</th>
            <th scope="col" class="text-center">Time</th>
            <th scope="col" class="text-center"></th>
        </tr>
        </thead>
        <tbody>


        <tr v-for="(user, ind) in users" v-if="users && users.length"  :class="[
        ind===0 ? 'first-user':
          ind===1 ? 'second-user':
           ind===2 ? 'third-user':
         '', activeFont && activeFont.hasOwnProperty('name') ? activeFont.name : '',  'test position-relative ']">


            <th scope="row" class="text-center">{{ind+1}}</th>
            <td class="text-center text-uppercase">{{user.name}}   </td>
            <td class="text-center">
                <div class="d-flex">
               ${{getDoneTotalPrice(user.prices)}}
               </div>
            </td>
            <td class="text-center cursor-pointer">
              <span>  {{user.prices && user.prices.length>0 && user.prices.filter(m=>m.isDone === true).length || 0  }} + | </span>
                <span>  {{user.prices && user.prices.length>0 && user.prices.filter(m=>m.isDone === false).length || 0  }} - </span>
                <span @click="addMargin(user)" class="ml-3 add-btn"><img src="images/add.svg" alt=""></span>
            </td>
            <td class="text-center">{{user.margeTime}}</td>
            <td class="text-center">
                <button type="button" @click="deleteUserFromList(user.id)" class="btn btn-danger">Delete</button>
                <button type="button" @click="editUser(user, user.name, user.marge, user.margeTime, user.id)" class="btn btn-primary">Edit</button>
            </td>
        </tr>

        </tbody>
    </table>
    </div>
</div>

    <b-modal
            id="modal-prevent-closing"
            ref="modalSettings"
            title="Settings"
            @show="showModalSettings"
            @ok="chooseSettings"
    >
        <div class="custom-file">
            <input name="image"  type="file" class="custom-file-input" @change="uploadImageFile($event.target.files)" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
            <label class="custom-file-label" for="inputGroupFile01" ></label>
            <label class="custom-file-label" for="inputGroupFile01" >Choose file</label>
        </div>
        <div class="images" v-if="projectImages.length">
           <div v-for="(img,i) in projectImages">
               <div class="d-flex project-images">
                   <input type="radio" :id="img.id" @change="changeCurrentBackground(img)" :value="img"  :checked="img.isActive">
                   <img :src="img.image" alt="" >
               </div>
           </div>
        </div>
    </b-modal>

    <b-modal
            id="modal-prevent-closing"
            ref="modalSettingsLine"
            title="TABLE LINE"
            @show="showModalSettingsLine"
            @ok="chooseSettingsLine"
    >

<!--        <verte picker="square" model="rgb" v-model="color"></verte>-->
        <select  @change="e => selectFont(e)" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="selectedFont"   >
            <option  v-for="font in fonts" :selected="font.isSelected" :class="font.className" :key="font.key" :value="font.value">{{font.name}}</option>

<!--            <option value="1" class="font1">font 1 </option>-->
<!--            <option value="2" class="font2">font 2 </option>-->
        </select>
        <div class="custom-file">
            <input name="image"  type="file" class="custom-file-input" @change="uploadImageFile($event.target.files)" id="inp" aria-describedby="inputGroupFileAdon01">
            <label class="custom-file-label" for="inputGroupFile01" ></label>
            <label class="custom-file-label" for="inputGroupFile01" >Choose file</label>
        </div>
        <div class="images" v-if="tableLineImages.length">
            <div v-for="(img,i) in tableLineImages">
                <div class="d-flex project-images">
                    <input type="radio" :id="img.id" @change="changeCurrentBackgroundLine(img)" :value="img"  :checked="img.isActive">
                    <img :src="img.image" alt="" >
                </div>
            </div>
        </div>

    </b-modal>






    <b-modal
            id="modal-prevent-closing"
            ref="modalMargin"
            title="Margin Add"

            size="lg"
            v-b-modal.modal-xl
            @show="showModalAddMargin"
            hide-footer="true"
    >

<!--        <h1><pre>{{activeUserForMargin.prices}}</pre></h1>-->


        <div class="d-flex justify-content-center my-3">
            <input v-model="addMarginPrice" name="marginPrice" id="addMarginPrice" class=" border border-dark mx-3 w-75 form-control"  placeholder="margin price" type="number" >
            <b-button class="mx-3 btn-danger" @click="addMarginToUser">add</b-button>
        </div>

        <div v-if="activeUserForMargin && activeUserForMargin.prices.length>0">
         <div v-for="price in activeUserForMargin.prices" class="m-1 d-flex justify-content-center align-items-center">
             <input type="number" :value="price.margin" class="form-control d-inline w-50" >
             <button type="button" @click="updatePrice({...price, isDone: true})" :class="[price.isDone === true ? 'opacity-5' : '', 'btn btn-lg btn-primary m-3' ]" :disabled="price.isDone === true ? true: false">+</button>
             <button type="button"  @click="updatePrice({...price, isDone: false})"   :class="[price.isDone === false ? 'opacity-5' : '', 'btn btn-lg btn-warning m-3' ]"  :disabled="price.isDone === false ? true: false">-</button>
             <span class="delete-icon cursor-pointer m-3" @click="deleteUserMarginPrice({priceId: price.id, user_id : price.user_id})"><img src="images/delete.svg" alt="" ></span>
         </div>
     </div>


    </b-modal>
    <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Submit Your Name"
            @show="showModal"
            @ok="handleOk"
    >

            <ValidationObserver tag="form" ref="userDetailsModal" action="" @submit.prevent="handleSubmit()">
                <h1>{{date}}</h1>
                <ValidationProvider tag="div" v-slot="{ classes }" rules="required" class="form-group text-left">
                    <label for="name">User Name</label>
                    <input v-model="name" name="name" id="name" class="form-control" :class="classes" placeholder="user name" type="text" >
                </ValidationProvider>

<!--                <ValidationProvider tag="div" v-slot="{ classes }" rules="required" class="form-group text-left">-->
<!--                    <label for="marge">Marge ($)</label>-->
<!--                    <input v-model="marge" name="marge" id="marge" class="form-control" :class="classes" placeholder="user marge" type="text" >-->
<!--                </ValidationProvider>-->

                <h1>{{margeTime}}</h1>
                <ValidationProvider tag="div" v-slot="{ classes }" rules="required" class="form-group text-left">
<!--                    <label for="margeTime">Marge Time  {{moment(margeTime).format('HH:MM')}} {{ moment(margeTime).format('MMMM Do YYYY, h:mm:ss a')}}</label>-->
                    <datetime v-model="margeTime" :use12-hour="true" type="time" class="w-100 time-picker"></datetime>


<!--                    <input v-model="margeTime"  name="margeTime" id="margeTime" class="form-control" :class="classes" placeholder="marge time" type="time" >-->
                </ValidationProvider>
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->



            </ValidationObserver>

<!--        <form ref="form" @submit.stop.prevent="handleSubmit">-->
<!--            <b-form-group-->
<!--                    label="Name"-->
<!--                    class="my-3"-->
<!--                    label-for="name-input"-->
<!--                    :state="nameState"-->
<!--            >-->
<!--                <b-form-input-->
<!--                        class="my-3"-->
<!--                        id="name-input"-->
<!--                        v-model="name"-->
<!--                        required-->
<!--                ></b-form-input>-->
<!--            </b-form-group>-->


<!--            <b-form-group-->
<!--                    label="Price $"-->
<!--            >-->
<!--                <b-form-input-->
<!--                        class="my-3"-->
<!--                        id="marge"-->
<!--                        v-model="marge"-->
<!--                        required-->
<!--                ></b-form-input>-->
<!--            </b-form-group>-->

<!--            <b-form-group-->
<!--                    label="Time"-->
<!--            >-->
<!--                <b-form-input-->
<!--                        class="my-3"-->
<!--                        id="margeTime"-->
<!--                        type="time"-->
<!--                        v-model="margeTime"-->
<!--                ></b-form-input>-->
<!--            </b-form-group>-->

<!--        </form>-->

    </b-modal>
</div>
</template>

<script>
   import moment from 'moment'
   import { Datetime } from 'vue-datetime';
   import Verte from 'verte';
   import { mapActions, mapState } from 'vuex'

export default {
  name: 'Dashboard',
    components : {
        datetime: Datetime,Verte

    },
  data () {
      return {
          checkbox: false,
          name: '',
          activeUserForMargin: null,
          addMarginPrice: '',
          backgroundImage: '',
          date:'',
          color:  '',
          uploadedFile: {},
          selectedFont: 'font2',
          fonts: [
              {
                  name:'font 1',
                  key : 1,
                  value:'font1',
                  isSelected: false,
                  className: 'font1'
              },
              {
                  name:'font 2',
                  value:'font2',
                  key : 2,
                  isSelected: true,
                  className: 'font2'
              },
              {
                  name:'font 3',
                  value:'font3',
                  key : 2,
                  isSelected: false,
                  className: 'font3'
              },
          ],
          config:{wrap: true,
              enableTime: true,
              noCalendar: true,
              dateFormat: "h:i K",
              defaultDate: null,
              minuteIncrement: "1",
              time_24hr: true},
          isNew: true,
          marge:[],
          moment:moment,
          margeTime: new Date(),
          userId:'',
          submittedNames: []
      }
  },
    mounted(){
      this.getUsers()
      this.getActiveFont().then(res => {
          console.log("aaaaaaaaaaaaaaa1000000")
      }).catch(err => {
          console.log("baby you have error", err)
      })
        this.getActiveImage()
        this.getActiveImageLine()
        this.changeLightMode(false)
    },
  computed: {
        ...mapState({
            users: state => state.users.users,
            projectImages: state => state.settings.projectImages,
            darkMode: state => state.auth.darkMode,
            activeBackgroundImage: state =>state.settings.activeBackgroundImage,
            selectedImage: state => state.settings.selectedImage,
            tableLineImages: state => state.tableLines.tableLineImages,
            activeBackgroundImageLine: state => state.tableLines.activeBackgroundImageLine,
            selectedImageLine: state => state.tableLines.selectedImageLine,
            activeFont: state => state.settings.activeFont
        })


  },

  methods: {
          ...mapActions({
              getUsers: 'users/getUsers',
              updateUser : 'users/updateUser',
              addUser: 'users/addUser',
              deleteUser: 'users/deleteUser',
              changeLightMode: 'auth/changeThemeMode',
              logout: 'auth/logout',
              uploadImage: 'settings/uploadImage',
              getImage: 'settings/getImage',
              updateStyleImage: 'settings/updateStyleImage',
              setActiveImage: 'settings/setActiveImage',
              getActiveImage: 'settings/getActiveImage',
              addMarginPriceBase: 'users/addMarginPrice',
              uploadImageLine: 'tableLines/uploadImageLine',
              getImageLine: 'tableLines/getImageLine',
              updateStyleImageLine: 'tableLines/updateStyleImageLine',
              setActiveImageLine: 'tableLines/setActiveImageLine',
              getActiveImageLine: 'tableLines/getActiveImageLine',
              getActiveFont : 'settings/getActiveFont',
              setActiveFont: 'settings/setActiveFont',
              addMarginPriceToUser: 'users/addMarginPriceToUser',
              deleteUserMarginPriceCall: 'users/deleteUserMarginPrice',
              updatePriceOfUser: 'users/updatePriceOfUser',
              cleanMargin: 'users/cleanMargin'



          }),
      test(){
              this.updateStyleImage({...this.projectImages[0], isActive:true})
      },
      showModalAddMargin(){},
      audioData(){
         const audio = {
            success: new Audio('audio/alert1.mp3')
          }
          return audio
      },
        CallRing(){
            this.audioData().success.play()
        },
      margeTimeConvert() {
          return moment(this.margeTime).format('MMMM Do YYYY, h:mm:ss a');
      },
      deleteUserFromList(id){
              this.deleteUser({id})
      },
      updateUserData(){
console.log("aaaaaaaaaaaaaaa1", {id:this.userId, name: this.name,  margeTime: this.margeTime, marge: this.marge})
                  this.updateUser({id:this.userId, name: this.name, margeTime: moment(this.margeTime).format('MMMM Do YYYY, h:mm:ss a'), marge: this.marge}).then(r=>{
                      this.$refs.modal.hide()
                  })
             },
          toggleCheckbox() {
              console.log("worked")
              this.changeLightMode(!this.darkMode)
          },
          signOut(){
              console.log("worked")
              this.logout().then(r => {
                  console.log("worked want route")
                  this.$router.push('/auth/sign-in')
              })
          },
      checkFormValidity() {
          const valid = this.$refs.form.checkValidity()
          this.nameState = valid
          return valid
      },
      openSettings(){
              console.log("vaga123")
              this.$refs.modalSettings.show()
              this.getImage()
      },
      editUser(user, name, marge, time, id){
              console.log("*************", user)
          this.activeUserForMargin = user
          console.log("time===",time);
          moment(time).format('MMMM Do YYYY, h:mm:ss a')
          this.userId = id
              this.isNew = false
              console.log(name, marge, time)
              this.name=name
          this.marge = marge
          this.margeTime = moment(time).format()
          console.log("uio", this.margeTime )
          this.$refs.modal.show()
      },
      showModal(){
              this.$refs.modal.show()
          // this.$bvModal.show()
      },
      showModalSettings(){
              this.$refs.modalSettings.show()
      },
      resetModal() {
         this.name = ''
         this.marge = 0
         this.time = new Date()
      },
      handleOk(bvModalEvt) {
          // Prevent modal from closing
          bvModalEvt.preventDefault()

          // Trigger submit handler
          this.handleSubmit()
      },
      handleSubmit() {
          this.$refs.userDetailsModal.validate().then(success => {
              if (success) {
                  if (this.isNew) {
                      console.log("time=", moment(this.margeTime).format('MMMM Do YYYY, h:mm:ss a'))
                      console.log("it is=", {name: this.name,  margeTime: moment(this.margeTime).format('MMMM Do YYYY, h:mm:ss a'), marge: this.marge})
                      setTimeout(()=>{
                          console.log("it is2=", {name: this.name,  margeTime: moment(this.margeTime).format('MMMM Do YYYY, h:mm:ss a'), marge: this.marge})
                          this.addUser({...this.activeUserForMargin, name: this.name,  margeTime: moment(this.margeTime).format('MMMM Do YYYY, h:mm:ss a'), marge: []}).then(r => {
this.resetModal()
                              this.$nextTick(() => {
                              })
                          })
                      },2000)
                      this.$bvModal.hide('modal-prevent-closing')
                      this.CallRing()
                  } else {
                      this.updateUserData().finally(r => {
                          this.isNew = true
                      })
                  }
              }
          })
      },
      uploadImageFile(value) {
          this.backgroundImage = value[0]
          console.log("value=", this.backgroundImage)
      },
      chooseSettings(){
          let formData = new FormData
          console.log("super")
          formData.append('image', this.backgroundImage)
          formData.append('isActive', false)
          const config = {
              headers: {"content-type" : "multipart/form-data"}
          }

          this.uploadImage({data: formData, config})
      },
      changeCurrentBackground(v) {
        console.log(v)
          this.setActiveImage({...v, isActive:1})

      },
      addMarginToUser(){

if (this.addMarginPrice) {
    let user_id = this.activeUserForMargin.id


    this.addMarginPriceToUser({user_id, margin:this.addMarginPrice, isDone : false}).then(d => {
        this.CallRing()
        this.addMarginPrice = ''
    })
}

//               console.log(this.addMarginPrice)
//           let margeArray = []
//               this.activeUserForMargin.marge.forEach(m => {
//                   margeArray.push({...m, price: Number(m.price)})
//           })
//           this.activeUserForMargin.marge = margeArray
//           let margeData = this.activeUserForMargin.marge.length !== 0 ? this.activeUserForMargin.marge : []
//           margeData.push({actionId: new Date().getTime(), isDone:false, price:this.addMarginPrice})
//
// this.addMarginPriceBase({...this.activeUserForMargin, marge:margeData})
      },

      addMargin(user){
          this.activeUserForMargin = user
          this.$refs.modalMargin.show()
      },
      handleMargeDone(actionId) {
          console.log("test1", actionId);
      },
      getDoneTotalPrice(prices) {
          let s = 0
          if (prices.length === 0) return 0
          console.log("marge=",typeof prices)

              prices.forEach(m => {
                  // if (m.isDone === true) {
                      s+= Number(m.margin)
                  // }
              })
          return s
      },
      showModalSettingsLine(){
          this.$refs.modalSettingsLine.show()
      },
      chooseSettingsLine(){
          let formData = new FormData
          console.log("super")
          formData.append('image', this.backgroundImage)
          formData.append('isActive', false)
          const config = {
              headers: {"content-type" : "multipart/form-data"}
          }

          this.uploadImageLine({data: formData, config})
      },
      changeCurrentBackgroundLine(v) {
          console.log(v)
          this.setActiveImageLine({...v, isActive:1})

      },
      openSettingsLine(){
          console.log("vaga123")
          this.$refs.modalSettingsLine.show()
          this.getImageLine()
      },
      selectFont(value) {
              console.log("value====", this.selectedFont)
          this.setActiveFont({name: this.selectedFont})
      },
      deleteUserMarginPrice(data) {

                  let _this = this
                  this.deleteUserMarginPriceCall(data).then(d => {
                      let prices = [..._this.activeUserForMargin.prices]

                      _this.activeUserForMargin.prices = prices.filter(p => p.id !== data.priceId)
                  })


      },
      updatePrice(data){
          console.log("brr",data);
          this.updatePriceOfUser(data).then(r => {
              let prices = [...this.activeUserForMargin.prices]
              let newPrices = []
         prices.forEach(p => {
                  if ( p.id === data.id) {
                      newPrices.push({...data})
                  } else {
                      newPrices.push(p)
                  }
              })

              this.activeUserForMargin.prices = [...newPrices]

          })
      },
      cleanMarginOfUsers(){
              this.cleanMargin()
      }
    },

  }











</script>
