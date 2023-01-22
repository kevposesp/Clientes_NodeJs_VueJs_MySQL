<template>
    <div class="clients">
        <div class="cont">
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
                            <th scope="row">{{ key+1 }}</th>
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
                                <button class="btn btn-sm btn-primary mx-1"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-sm btn-danger mx-1"><i class="bi bi-trash3-fill"></i></button>
                                <button class="btn btn-sm btn-success mx-1"><i class="bi bi-plus-lg"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { clientsComp } from '../composables/clients'
import { ref, reactive } from 'vue'

export default {
    setup() {
        const { list } = clientsComp()

        var clients = reactive({})

        const getClients = async () => {
            let clientList = await list()
            if (clientList.status) {
                clients.clients = clientList.clients
            }
        }
        getClients()

        return {
            clients
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