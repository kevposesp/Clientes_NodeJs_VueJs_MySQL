<template>
    <div class="clients">
        <div class="cont">
            <button class="btn btn-success mx-1 float-end" @click="state.createClientData.open = true">Añadir Cliente <i class="bi bi-plus-lg"></i></button>
            <div class="col-md-12 table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Notas</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Telf: 2</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(client, key) in clients.clients" :key="key">
                            <th scope="row">{{ key+ 1 }}</th>
                            <td>{{ client.nombre }}</td>
                            <td>{{ client.direccion }}</td>
                            <td>{{ client.notas }}</td>
                            <td>{{ client.tel }}</td>
                            <td>{{ client.telSec }}</td>
                            <td>
                                <!-- <span class="badge rounded-pill text-bg-danger">InActive</span> -->
                                <span class="badge rounded-pill text-bg-success">Active</span>
                            </td>
                            <td>
                                <router-link :to="'/client/edit/' + client.id">
                                    <button class="btn btn-sm btn-primary mx-1"><i
                                            class="bi bi-pencil-square"></i></button>
                                </router-link>

                                <button class="btn btn-sm btn-danger mx-1" @click="deleteModal(client)"><i
                                        class="bi bi-trash3-fill"></i></button>
                                <button class="btn btn-sm btn-success mx-1"
                                    @click="state.createOrderData.open = true, state.createOrderData.idClient = client.id, state.createOrderData.nombreClient = client.nombre"><i
                                        class="bi bi-plus-lg"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" :class="modalData.open ? 'show d-block' : ''" @click="modalData.open = false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Quieres eliminar este cliente?</h1>
                        <button type="button" class="btn-close" @click="modalData.open = false"></button>
                    </div>
                    <div class="modal-body">
                        {{ modalData.nombre }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            @click="modalData.open = false">Cancelar</button>
                        <button type="button" class="btn btn-danger" @click="deleteCli(modalData.id)">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="modalData.open" class="modal-backdrop fade" :class="modalData.open ? 'show' : ''"></div>
        <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
        <CreateOrder :create-order-data="state.createOrderData" v-on:statusOrder="createOrderRes" v-if="state.createOrderData.open"></CreateOrder>
        <CreateClient v-on:statusClient="createClientRes" v-if="state.createClientData.open"></CreateClient>
    </div>
</template>

<script>
import { clientsComp } from '../composables/clients'
import { ref, reactive } from 'vue'
import Alert from '../components/Alert.vue'
import CreateOrder from '../components/CreateOrder.vue'
import CreateClient from '../components/CreateClient.vue'

export default {
    components: { Alert, CreateOrder, CreateClient },
    setup() {
        const state = reactive({
            alertData: {
                open: false,
                status: 0,
                message: ''
            },
            createOrderData: {
                open: false,
                idClient: 0,
                nombreClient: ''
            },
            createClientData: {
                open: false
            }
        })
        const modalData = reactive({
            open: false,
            id: '',
            nombre: ''
        })
        const { list, deleteClient } = clientsComp()

        var clients = reactive({})

        const getClients = async () => {
            let clientList = await list()
            if (clientList.status) {
                clients.clients = clientList.clients
            }
        }
        getClients()

        const deleteModal = async (c) => {
            modalData.open = true
            modalData.nombre = c.nombre
            modalData.id = c.id
        }

        const deleteCli = async (id) => {
            let delClie = await deleteClient(id)

            if (delClie.message == 'delete_user_ok') {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Se ha eliminado correctamente'
                getClients()
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            } else {
                state.alertData.open = true
                state.alertData.status = 403
                state.alertData.message = 'Error interno'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            }
        }

        const createOrderRes = (m) => {
            console.log(m);
            if(m.status == 200) {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Se ha realizado un pedido'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            } else if (m.status != 200 && m){
                state.alertData.open = true
                state.alertData.status = 403
                state.alertData.message = 'No se ha podido realizar el pedido'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            }
            state.createOrderData.open = false
        }

        const createClientRes = (m) => {
            if(m.status == 200) {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Se ha creado el cliente'
                getClients()
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            } else if (m.status != 200 && m){
                state.alertData.open = true
                state.alertData.status = 403
                state.alertData.message = 'No se ha podido crear'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            }
            state.createClientData.open = false
        }

        return {
            clients,
            deleteModal,
            modalData,
            deleteCli,
            state,
            createOrderRes,
            createClientRes
        }
    },
}
</script>

<style lang="scss">
.clients {
    margin-top: 56px;
    padding: 5px;

    .cont {
        padding: 5px;
        border-radius: 8px;
        border: 1px solid #cecece;
    }
}
</style>