<template>
  <div class="card-body mt-2 mb-2">
    <img src='/images/logo.png' class=" d-lg-none header-brand-img text-left float-left mb-4" alt="logo">
    <div class="clearfix"></div>
    <ValidationObserver tag="form" ref="signInForm" action="" @submit.prevent="onSubmit()">
      <h5 class="text-left mb-2">{{$t('auth.signInAccount')}}</h5>
      <p class="mb-4 text-muted tx-13 ml-0 text-left">{{$t('auth.signInAccountInfo')}}</p>
      <ValidationProvider tag="div" v-slot="{ classes }" rules="required|email" class="form-group text-left">
        <label for="email">{{$t('auth.email')}}</label>
        <input id="email" v-model="loginFormData.email" :class="classes" type="email" name="email" class="form-control"
               :placeholder="$t('auth.enterEmail')"/>
      </ValidationProvider>
      <ValidationProvider tag="div" v-slot="{ classes }" rules="required" class="form-group text-left">
        <label for="password">{{$t('auth.password')}}</label>
        <input v-model="loginFormData.password" type="password" id="password" name="password" class="form-control"
               :class="classes" :placeholder="$t('auth.enterPassword')"/>
      </ValidationProvider>
      <button class="btn ripple btn-main-primary btn-block" :disabled="disabledSubmitBtn">{{$t('auth.signIn')}}</button>
      <small class="text-danger">{{errorMsg}}</small>
    </ValidationObserver>
    <div class="text-left mt-5 ml-0">
      <div class="mb-1">
        <router-link to="/auth/forgot-password">{{$t('auth.forgotPassword')}}?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  data () {
    return {
      loginFormData: {},
      disabledSubmitBtn: false,
      errorMsg: ''
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),

    onSubmit () {
      this.$refs.signInForm.validate().then(success => {
        if (success) {
          this.errorMsg = ''
          this.login(this.loginFormData).then(() => {
            this.$router.push('/')
          }).catch(err => {
            if (err.response.data.error === 'incorrect_credentials') {
              this.errorMsg = 'неправильный логин или пароль!'
              return false
            } else {
              this.errorMsg = 'Что то пошло не так!'
            }
          }).finally(() => {
            this.disabledSubmitBtn = false
          })
        }
      })
    }
  }
}
</script>
