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
                                    <th scope="row">{{ key+ 1 }}</th>
                                    <td>{{ order.nombreClient }}</td>
                                    <td>{{ order.direccion }}</td>
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
                                            v-if="order.status == 2">Pendiente Pago</span>
                                        <span class="badge rounded-pill text-bg-danger"
                                            v-if="order.status == 4">Cancelado</span>
                                        <span class="badge rounded-pill text-bg-primary" v-if="order.status == 1">En
                                            reparto</span>
                                        <span class="badge rounded-pill text-bg-info"
                                            v-if="order.status == 5">Preparado</span>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-primary mx-1"><i
                                                class="bi bi-pencil-square"></i></button>
                                        <button class="btn btn-sm btn-danger mx-1"><i
                                                class="bi bi-trash3-fill"></i></button>
                                        <button class="btn btn-sm btn-success mx-1"><i
                                                class="bi bi-plus-lg"></i></button>
                                    </td>
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
    </div>
</template>

<script>
import { ordersComp } from '@/composables/orders';
import { ref, reactive } from 'vue'

export default {
    setup() {
        const state = reactive({})
        const changeAvtiveMenu = (m) => {
            state.activeMenu = m
        }

        const { readOrders } = ordersComp()
        const getOrders = async () => {
            let ordersList = await readOrders()
            state.dates = []
            for (const o in ordersList.orders) {
                state.dates.push(o)
            }
            state.ordersList = ordersList.orders
            state.activeMenu = state.dates[0]
        }
        getOrders()

        const sum = (s, type) => {
            let res = 0
            let res2 = 0
            state.ordersList[s].forEach(e => {
                if(type == 'to'){
                    res2++
                    res += e.cant
                }
                if(type == 'co' && e.status == 3) {
                    res2++
                    res += e.cant
                }
                if(type == 'pp' && [0, 1, 2, 5].includes(e.status)){
                    res2++
                    res += e.cant
                }
                if(type == 'ca' && e.status == 4) {
                    res2++
                    res += e.cant
                }
                
            });
            return res2 + '/' + res
        }

        return {
            state,
            changeAvtiveMenu,
            sum
        }

    },
}
</script>

<style lang="scss">
.orders {
    margin-top: 56px;
    padding: 5px;
}
</style>