<template>
    <div class="orders">
        <div class="cont">
            <ul class="nav nav-tabs">
                <li class="nav-item" v-for="(date, key) in state.dates" :key="key">
                    <button class="nav-link" :class="state.activeMenu == date ? 'active' : ''" type="button"
                        @click="changeAvtiveMenu(date)">{{ date }}</button>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade" :class="state.activeMenu == date ? 'show active' : ''"
                    v-for="(date, key) in state.dates" :key="key">
                    <!-- {{ state.ordersList[date] }} -->
                    <div class="col-md-12 table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Hora Pedido</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Nota Pedido</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(order, key) in state.ordersList[date]" :key="key">
                                    <template v-if="order.orderId">
                                        <th scope="row">{{ key + 1 }}</th>
                                        <td>
                                            <router-link :to="'/client/edit/' + order.clientId" class="noLink">
                                                {{ order.nombreClient }}
                                            </router-link>
                                        </td>
                                        <td v-if="order.direccionPedido != null">{{ order.direccionPedido }}</td>
                                        <td v-if="order.direccionPedido == null">{{ order.direccion }}</td>
                                        <td>{{ order.horaPedido.substring(0, 5) }}</td>
                                        <td>{{ order.cant }}</td>
                                        <td>{{ order.nota }}</td>
                                        <td>{{ order.nombreOwner }}</td>
                                        <td>
                                            <!-- <span class="badge rounded-pill text-bg-danger">InActive</span> -->
                                            <span class="badge rounded-pill text-bg-secondary"
                                                v-if="order.status == 0">Pendiente</span>
                                            <span class="badge rounded-pill text-bg-success"
                                                v-if="order.status == 3">Completado</span>
                                            <span class="badge rounded-pill text-bg-warning"
                                                v-if="order.status == 2">Pendiente
                                                Pago</span>
                                            <span class="badge rounded-pill text-bg-danger"
                                                v-if="order.status == 4">Cancelado</span>
                                            <span class="badge rounded-pill text-bg-primary" v-if="order.status == 1">En
                                                reparto</span>
                                            <span class="badge rounded-pill text-bg-info"
                                                v-if="order.status == 5">Preparado</span>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-primary mx-1"
                                                @click="state.componentEditOrder = true, state.editOrderData = order"><i
                                                    class="bi bi-pencil-square"></i></button>
                                            <button class="btn btn-sm btn-danger mx-1"
                                                @click="cancelOrderFunc(order.orderId)"><i
                                                    class="bi bi-trash3-fill"></i></button>
                                            <button class="btn btn-sm btn-success mx-1"
                                                @click="state.createOrderData.open = true, state.createOrderData.idClient = order.clientId, state.createOrderData.nombreClient = order.nombreClient"><i
                                                    class="bi bi-plus-lg"></i></button>
                                        </td>
                                    </template>
                                </tr>
                                <tr>
                                    <th scope="row">Total</th>
                                    <td>{{ sum(date, 'to') }}</td>
                                    <th>Completados</th>
                                    <td>{{ sum(date, 'co') }}</td>
                                    <th>Pendientes</th>
                                    <td>{{ sum(date, 'pp') }}</td>
                                    <th>Cancelados</th>
                                    <td>{{ sum(date, 'ca') }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
        <CreateOrder :create-order-data="state.createOrderData" v-on:statusOrder="createOrderRes"
            v-if="state.createOrderData.open"></CreateOrder>
        <EditOrder :edit-order-data="state.editOrderData" v-on:statusOrder="editOrderRes" v-if="state.componentEditOrder">
        </EditOrder>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue';
import EditOrder from '@/components/EditOrder.vue';
import CreateOrder from '../components/CreateOrder.vue'
import { ordersComp } from '@/composables/orders';
import { ref, reactive } from 'vue'

export default {
    components: { Alert, EditOrder, CreateOrder },
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
            componentEditOrder: false,
            editOrderData: {}
        })

        const changeAvtiveMenu = (m) => {
            state.activeMenu = m
            localStorage.setItem('activeMenu', m)
            getOrders()
        }

        const { readOrders, cancelOrder } = ordersComp()
        const getOrders = async () => {
            let ordersList = await readOrders()
            state.dates = []
            for (const o in ordersList.orders) {
                state.dates.push(o)
            }
            state.ordersList = ordersList.orders
            state.activeMenu = state.dates.includes(localStorage.getItem('activeMenu')) ? localStorage.getItem('activeMenu') : state.dates[0]
        }
        getOrders()

        const sum = (s, type) => {
            let res = 0
            let res2 = 0
            state.ordersList[s].forEach(e => {
                if (type == 'to' && e.orderId != null) {
                    res2++
                    res += e.cant
                }
                if (type == 'co' && e.status == 3) {
                    res2++
                    res += e.cant
                }
                if (type == 'pp' && [0, 1, 2, 5].includes(e.status)) {
                    res2++
                    res += e.cant
                }
                if (type == 'ca' && e.status == 4) {
                    res2++
                    res += e.cant
                }

            });
            return res2 + '/' + res
        }

        const editOrderRes = (m) => {
            if (m.status == 200) {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Se ha editado un pedido'
                getOrders()
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            } else if (m.status != 200 && m) {
                state.alertData.open = true
                state.alertData.status = 403
                state.alertData.message = 'No se ha podido editar el pedido'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            }
            state.componentEditOrder = false
        }

        const cancelOrderFunc = async (id) => {
            let res = await cancelOrder(id)
            if (res) {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Se ha cancelado un pedido'
                getOrders()
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            } else {
                state.alertData.open = true
                state.alertData.status = 403
                state.alertData.message = 'No se ha podido cancelar el pedido'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            }
        }

        const createOrderRes = (m) => {
            if (m.status == 200) {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Se ha realizado un pedido'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            } else if (m.status != 200 && m) {
                state.alertData.open = true
                state.alertData.status = 403
                state.alertData.message = 'No se ha podido realizar el pedido'
                setTimeout(() => {
                    state.alertData.open = false
                }, 3000);
            }
            state.createOrderData.open = false
        }

        return {
            state,
            changeAvtiveMenu,
            editOrderRes,
            createOrderRes,
            cancelOrderFunc,
            sum
        }

    },
}
</script>

<style lang="scss">.orders {
    margin-top: 56px;
    padding: 5px;
}</style>