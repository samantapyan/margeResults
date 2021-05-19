<template>
<div class="w-full position-relative" >

    <div class="area position-absolute top-0 left-0" >
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
           <b-button class="mx-3 btn-danger" @click="showModal" >Add User</b-button>
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
    <table
    :class="[darkMode ? 'table-dark main-table-dark' : 'table-light main-table-light', 'table main-table']"
    >
        <thead>
        <tr>
            <th scope="col" class="text-center">#</th>
            <th scope="col" class="text-center" >Name</th>
            <th scope="col" class="text-center" >Marge</th>
            <th scope="col" class="text-center">Time</th>
            <th scope="col" class="text-center"></th>
        </tr>
        </thead>
        <tbody>


        <tr v-for="(user, ind) in users" v-if="users && users.length" :class="[
        ind===0 ? 'first-user':
          ind===1 ? 'second-user':
           ind===2 ? 'third-user':
         '']">

            <th scope="row" class="text-center">{{ind+1}}</th>
            <td class="text-center">{{user.name}}</td>
            <td class="text-center">{{user.marge}}</td>
            <td class="text-center">{{user.margeTime}}</td>
            <td class="text-center">
                <button type="button" @click="deleteUserFromList(user.id)" class="btn btn-danger">Delete</button>

                <button type="button" @click="editUser(user.name, user.marge, user.margeTime, user.id)" class="btn btn-primary">Edit</button>
            </td>
        </tr>

        </tbody>
    </table>
</div>



    <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Submit Your Name"
            @show="showModal"
            @hidden="resetModal"
            @ok="handleOk"
    >


            <ValidationObserver tag="form" ref="userDetailsModal" action="" @submit.prevent="handleSubmit()">
                <ValidationProvider tag="div" v-slot="{ classes }" rules="required" class="form-group text-left">
                    <label for="name">User Name</label>
                    <input v-model="name" name="name" id="name" class="form-control" :class="classes" placeholder="user name" type="text" >
                </ValidationProvider>

                <ValidationProvider tag="div" v-slot="{ classes }" rules="required" class="form-group text-left">
                    <label for="marge">Marge ($)</label>
                    <input v-model="marge" name="marge" id="marge" class="form-control" :class="classes" placeholder="user marge" type="text" >
                </ValidationProvider>

                <h1>{{reversedMessage}}</h1>
                <ValidationProvider tag="div" v-slot="{ classes }" rules="required" class="form-group text-left">
<!--                    <label for="margeTime">Marge Time  {{moment(margeTime).format('HH:MM')}} {{ moment(margeTime).format('MMMM Do YYYY, h:mm:ss a')}}</label>-->
                    <input v-model="reversedMessage"  name="margeTime" id="margeTime" class="form-control" :class="classes" placeholder="marge time" type="time" >
                </ValidationProvider>









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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
      return {
          checkbox: false,
          name: '',
          isNew: true,
          marge:0,
          moment:moment,
          margeTime: new Date(),
          userId:'',
          submittedNames: []
      }
  },
    mounted(){
      this.getUsers()
        this.changeLightMode(false)
    },
  computed: {
        ...mapState({
            users: state => state.users.users,
            darkMode: state => state.auth.darkMode
        }),
      reversedMessage:  {
          // `this` points to the vm instance
          get: function () {
              return moment(this.margeTime).format('HH:mm');
          },

          set: function (newValue) {
              // console.log("aaa",moment(newValue).format('LLLL'));
              this.margeTime= newValue;

              // return moment(new Date()).format('LLLL')
          }
      }

  },

  methods: {
          ...mapActions({
              getUsers: 'users/getUsers',
              updateUser : 'users/updateUser',
              addUser: 'users/addUser',
              deleteUser: 'users/deleteUser',
              changeLightMode: 'auth/changeThemeMode',
              logout: 'auth/logout',

          }),
      margeTimeConvert() {
          return moment(this.margeTime).format('LT');
      },
      deleteUserFromList(id){
              this.deleteUser({id})
      },
          updateUserData(){

                  this.updateUser({id:this.userId, name: this.name,  margeTime: this.time, marge: this.marge}).then(r=>{
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

      editUser(name, marge, time, id){
          this.userId = id
              this.isNew = false
              console.log(name, marge, time)
              this.name=name
          this.marge = marge
          this.margeTime = time
          this.$refs.modal.show()
      },
      showModal(){
              this.$refs.modal.show()
          // this.$bvModal.show()
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
                      console.log("time=", moment(margeTime).format('L'))
                      console.log("it is=", {name: this.name,  margeTime: this.margeTime, marge: this.marge})
                      this.addUser({name: this.name,  margeTime: this.margeTime, marge: this.marge}).then(r => {
                          this.$nextTick(() => {
                              this.$bvModal.hide('modal-prevent-closing')
                          })
                      })
                  } else {
                      this.updateUserData().finally(r => {
                          this.isNew = true
                      })
                  }
              }
          })



      }
    },
    watch : {
      margeTime : function(val) { return moment(this.margeTime).format('HH:mm')}

    }
  }











</script>
