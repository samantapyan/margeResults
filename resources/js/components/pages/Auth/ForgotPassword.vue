<template>
  <div class="card-body mt-2 mb-2">
<!--    <img src="@/assets/img/brand/logo.png" class=" d-lg-none header-brand-img text-left float-left mb-4" alt="logo">-->
    <div class="clearfix"></div>
    <h5 class="text-left mb-2 text-capitalize">{{$t('auth.forgotPassword')}}</h5>
    <p class="mb-4 text-muted tx-13 ml-0 text-left">{{$t('auth.forgotPasswordInfo')}}</p>
    <ValidationObserver tag="form" ref="forgotPasswordForm" action="" @submit.prevent="onSubmit()">
      <ValidationProvider tag="div" v-slot="{ classes }" rules="required|email" class="form-group text-left">
        <label for="email">{{$t('auth.email')}}</label>
        <input v-model="forgotPasswordFormData.email" name="email" id="email" class="form-control" :class="classes" :placeholder="$t('auth.enterEmail')" type="text" value="">
      </ValidationProvider>
      <button class="btn ripple btn-main-primary btn-block" :disabled="disabledSubmitBtn">{{$t('auth.getNewPassword')}}</button>
    </ValidationObserver>
    <div class="card-footer border-top-0 pl-0 mt-3 text-left">
      <p>{{$t('auth.rememberedPassword')}}</p>
      <p class="mb-0">Try to <router-link to="/auth/sign-in">{{$t('auth.signIn')}}</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      forgotPasswordFormData: {},
      errorMsg: '',
      disabledSubmitBtn: false
    }
  },
  methods: {
    ...mapActions({
      getNewPassword: 'auth/getNewPassword'
    }),

    onSubmit () {
      this.$refs.forgotPasswordForm.validate().then(success => {
        if (success) {
          this.errorMsg = ''
          this.getNewPassword(this.forgotPasswordFormData).then(() => {
          }).catch(() => {
            this.errorMsg = 'Что то пошло не так!'
          }).finally(() => {
            this.disabledSubmitBtn = false
          })
        }
      })
    }
  }
}
</script>
