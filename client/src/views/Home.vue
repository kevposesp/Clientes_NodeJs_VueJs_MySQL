<template>
  <div class="home">
    <div class="row mt-2 m-0 justify-content-center">
      <createDateEvent v-on:createEvent="res" class="col-sm-6 col-md-6 col-lg-4"></createDateEvent>
      <showDates class="col-lg-4 col-sm-6 col-md-6"></showDates>
    </div>

    <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
  </div>
</template>

<script>
import createDateEvent from '@/components/CreateDateEvent.vue'
import showDates from '@/components/ShowDates.vue'
import Alert from '@/components/Alert.vue'

import { ref, reactive } from 'vue'

export default {
  name: 'Home',
  components: {
    createDateEvent,
    showDates,
    Alert
  },
  setup() {
    const state = reactive({
      alertData: {
        open: false,
        status: 0,
        message: ''
      }
    })

    const res = async (e) => {
      if (e == true) {
        state.alertData.open = true
        state.alertData.status = 200
        state.alertData.message = 'Se ha creado el evento'
        setTimeout(() => {
          state.alertData.open = false
        }, 3000);
      } else if (e == "ex_event") {
        state.alertData.open = true
        state.alertData.status = 500
        state.alertData.message = 'Ya existe esta fecha de evento'
        setTimeout(() => {
          state.alertData.open = false
        }, 3000);
      } else {
        state.alertData.open = true
        state.alertData.status = 500
        state.alertData.message = 'Error al crear el evento'
        setTimeout(() => {
          state.alertData.open = false
        }, 3000);
      }
    }

    return {
      state,
      res
    }
  }
}
</script>

<style lang="scss">
.home {
  margin-top: 56px;
  padding: 5px;
}

@media (max-width: 575.98px) {
}

@media (max-width: 767.98px) {}

@media (max-width: 991.98px) {}

@media (max-width: 1199.98px) {}

@media (min-width: 1199.98px) {}

@media (max-width: 1399.98px) {}
</style>
