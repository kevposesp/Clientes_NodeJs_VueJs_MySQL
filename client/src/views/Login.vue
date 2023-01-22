<template>
    <div class="login">
        <div class="vh-100 d-flex justify-content-center align-items-center">
            <div class="col-md-4 p-5 shadow-sm border rounded-3">
                <h2 class="text-center mb-4 text-primary">Login Form</h2>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputUsername1" class="form-label">Username</label>
                        <input type="text" class="form-control border border-primary" id="exampleInputUsername1"
                            v-model="userData.username">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control border border-primary" id="exampleInputPassword1"
                            v-model="userData.password">
                    </div>
                    <div class="d-grid">
                        <button class="btn btn-primary" type="button" @click="signIn">Login</button>
                    </div>
                </form>
            </div>
        </div>
        <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
    </div>
</template>

<script>
import { authComp } from '../composables/auth'
import { ref, reactive } from 'vue'
import Alert from '../components/Alert.vue'
import router from '@/router'

export default {
    components: { Alert },
    setup() {
        const state = reactive({
            alertData: {
                open: false,
                status: 0,
                message: ''
            }
        })
        const { login } = authComp()
        const userData = reactive({
            username: 'kevin',
            password: '12345678'
        })
        const processUserData = () => {
            let data = userData;
            return {
                user: data.username,
                password: data.password
            }
        }

        const signIn = async () => {
            let usr = processUserData()
            let sign = await login(usr)
            if (sign.status == 200) {
                localStorage.setItem('accessToken', sign.accessToken)
                localStorage.setItem('refreshToken', sign.refreshToken)
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Has iniciado sesion'

                setTimeout(() => {
                    state.alertData.open = false
                    router.push("/")
                }, 3000);
            } else {
                state.alertData.open = true
                state.alertData.status = 401
                state.alertData.message = 'Error interno'

                setTimeout(() => {
                    state.alertData.open = false
                    router.push("/login")
                }, 3000);
            }
        }
        return {
            userData,
            signIn,
            state
        }
    },
}
</script>