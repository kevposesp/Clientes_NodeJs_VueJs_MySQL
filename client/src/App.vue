<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="'/'">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :class="route == 'clients' ? 'active' : ''" :to="'/clients'" >Clientes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="route == 'orders' ? 'active' : ''" :to="'/orders'" >Pedidos</router-link>
            </li>
          </ul>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <!-- <i class="bi bi-person-circle"></i> -->
              <i class="bi bi-gear-wide-connected"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
              <!-- <li><a class="dropdown-item" href="#">Action</a></li> -->
              <!-- <li>
                <hr class="dropdown-divider">
              </li> -->
              <li><a class="dropdown-item" @click="logOut">Cerrar sesion</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
    <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRoute } from "vue-router";
import Alert from '@/components/Alert.vue'
import router from '@/router'

export default {
  components: { Alert },
  setup() {
    const route = ref(window.location.pathname.split('/')[1])
    const state = reactive({
            alertData: {
                open: false,
                status: 0,
                message: ''
            }
        })
    const logOut = async () => {

      await localStorage.removeItem('accessToken')
      await localStorage.removeItem('refreshToken')
      state.alertData.open = true
      state.alertData.status = 200
      state.alertData.message = 'Has cerrado sesion'

      setTimeout(() => {
        state.alertData.open = false
        router.push("/login")
      }, 3000);
    }
    return {
      logOut,
      route,
      state
    }
  },
}
</script>
<style lang="scss">
.app {
  .navbar {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    z-index: 100;
  }
}

@media (max-width: 575.98px) {}

@media (max-width: 767.98px) {}

@media (max-width: 991.98px) {
  .app {
    .navbar {
      .dropdown-menu-end {
        right: inherit;
      }
    }
  }
}

@media (max-width: 1199.98px) {}

@media (min-width: 1199.98px) {}

@media (max-width: 1399.98px) {}
</style>
