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

                                    <button class="btn btn-sm btn-danger mx-1"
                                        @click="state.deleteClientData.open = true, state.deleteClientData.id = state.client.id, state.deleteClientData.nombre = state.client.nombre"><i
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
            </div>
        </div>
        <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
        <DeleteClient :delete-client-data="state.deleteClientData" v-on:statusClient="deleteClientRes"
            v-if="state.deleteClientData.open"></DeleteClient>
    </div>
</template>

<script>
import { clientsComp } from '../composables/clients'
import { ref, reactive } from 'vue'
import Alert from '../components/Alert.vue'
import DeleteClient from '../components/DeleteClient.vue'
import { useRoute } from 'vue-router';
import router from '@/router';

export default {
    components: { Alert, DeleteClient },
    setup() {
        const state = reactive({
            alertData: {
                open: false,
                status: 0,
                message: ''
            },
            client: {},
            edit: false,
            deleteClientData: {
                open: false,
                id: 0,
                nombre: ''
            }
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

        const deleteClientRes = async (m) => {
            if (m.message == 'delete_user_ok') {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Se ha eliminado correctamente'
                setTimeout(() => {
                    state.alertData.open = false
                    router.push('/clients')
                }, 3000);
            } else if (m.message != "delete_user_ok" && m) {
                state.alertData.open = true
                state.alertData.status = 403
                state.alertData.message = 'Error interno'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            }
            state.deleteClientData.open = false
        }

        return {
            deleteClientRes,
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