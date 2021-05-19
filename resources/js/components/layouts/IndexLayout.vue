<template>
    <div class="page">
      <Header/>
      <div class="pt-0">
        <div class="">
          <div class="inner-body">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'IndexLayout',
  components: {

  },
  created () {

  },
  methods: {
    ...mapActions({
      getLanguages: 'language/getLanguages'
    })
  }

}
</script>
<style>
</style>
