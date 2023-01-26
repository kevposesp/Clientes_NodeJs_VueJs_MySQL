<template>
    <div class="editClient">
        <div class="container py-5">

            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
                            <h5 class="my-3">{{ state.client.nombre }}</h5>
                            <div class="d-flex justify-content-center mb-2">
                                <a :href="'tel:+34' + state.client.tel">
                                    <button type="button" class="btn btn-primary">Llamar</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body dataClient">
                            <div class="row">
                                <div class="col-md-9">
                                    <p class="mb-0">Datos del Cliente</p>
                                </div>
                                <div class="col-md-3 mt-2 mt-md-0">
                                    <button class="btn btn-sm btn-primary mx-1" @click="state.edit = true"><i
                                            class="bi bi-pencil-square"></i></button>

                                    <button class="btn btn-sm btn-danger mx-1"><i
                                            class="bi bi-trash3-fill"></i></button>
                                    <button class="btn btn-sm btn-success mx-1"><i class="bi bi-plus-lg"></i></button>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Nombre</p>
                                </div>
                                <div class="col-sm-9">
                                    <!-- <p class="text-muted mb-0">{{ state.client.nombre }}</p> -->
                                    <input type="text" class="form-control" v-model="state.client.nombre"
                                        :disabled="state.edit ? disabled : ''">
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Direccion</p>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" v-model="state.client.direccion"
                                        :disabled="state.edit ? disabled : ''">
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Notas</p>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" v-model="state.client.notas"
                                        :disabled="state.edit ? disabled : ''">
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Movil</p>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" v-model="state.client.tel"
                                        :disabled="state.edit ? disabled : ''">
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Telefono</p>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" v-model="state.client.telSec"
                                        :disabled="state.edit ? disabled : ''">
                                </div>
                            </div>
                            <div class="row col-6 col-sm-3 m-auto mt-3" v-if="state.edit">
                                <button class="btn btn-sm btn-primary mx-1" @click="saveClient(state.client.id)">Guardar
                                    <i class="bi bi-save"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-md-6">
                    <div class="card mb-4">
                        <div class="card-body">
                            <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project
                                Status
                            </p>
                            <p class="mb-1" style="font-size: .77rem;">Web Design</p>
                            <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                            <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                            <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                            <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                            <div class="progress rounded mb-2" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div> -->

            </div>
        </div>
        <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
    </div>
</template>

<script>
import { clientsComp } from '../composables/clients'
import { ref, reactive } from 'vue'
import Alert from '../components/Alert.vue'
import { useRoute } from 'vue-router';
import router from '@/router';

export default {
    components: { Alert },
    setup() {
        const state = reactive({
            alertData: {
                open: false,
                status: 0,
                message: ''
            },
            client: {},
            edit: false
        })
        const { listClient, updateClient } = clientsComp()
        const route = useRoute()

        const getClient = async () => {
            let client = await listClient(route.params.id)
            if (client) {
                state.client = client
            } else {
                state.alertData.open = true
                state.alertData.status = 403
                state.alertData.message = 'No existe este usuario'
                setTimeout(() => {
                    state.alertData.open = false
                    router.push('/clients')
                }, 3000);
            }
        }
        getClient()

        const saveClient = async () => {
            // console.log(processUserData());
            let client = await updateClient(processUserData())
            if (client) {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Se ha guardado los datos'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
                state.edit = false
                getClient()
            } else {
                state.alertData.open = true
                state.alertData.status = 404
                state.alertData.message = 'Error al guardar'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
                state.edit = false
                getClient()
            }
        }
        
        const processUserData = () => {
            let data = state.client;
            return {
                id: data.id,
                nombre: data.nombre,
                direccion: data.direccion,
                notas: data.notas,
                tel: data.tel,
                telSec: data.telSec
            }
        }

        return {
            state,
            saveClient
        }
    },
}
</script>

<style lang="scss">
.editClient {
    margin-top: 56px;
    padding: 5px;

    .dataClient {
        input {
            border: 0px;
            border-bottom: 1px solid #cecece;
            border-radius: 0;

            &:focus {
                box-shadow: none;
            }

            &:focus-visible {
                outline: 0;
            }

            &:disabled {
                background-color: #f6f6f6;
            }
        }
    }
}
</style>