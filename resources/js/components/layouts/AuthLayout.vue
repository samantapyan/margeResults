<template>
  <div class="page main-signin-wrapper">
    <div class="row signpages m-auto text-center">
      <div class="col-md-12">
        <div class="card">
          <div class="row row-sm">
            <div class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">
              <div class="mt-5 pt-4 p-2 pos-absolute">
                <div class="clearfix"></div>
<!--                <img src="@/assets/img/svgs/user.svg" class="ht-100 mb-0" alt="user">-->
                <h5 class="mt-4 text-white">{{$t('auth.createAccount')}}</h5>
                <span class="tx-white-6 tx-13 mb-5 mt-xl-0">{{$t('auth.createAccountInfo')}}</span>
              </div>
            </div>
            <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form ">
              <div class="">
                <div class="row row-sm">
                  <router-view/>
                </div>
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
  name: 'AuthLayout',
  components: {
  }
}
</script>
<style>

</style>
