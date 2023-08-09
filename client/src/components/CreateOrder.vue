<template>
    <div class="createOrder">
        <div class="modal fade show d-block" @click="closeModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Crear pedido de {{ createOrderData.nombreClient }}?</h1>
                        <button type="button" class="btn-close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- {{ createOrderData }} <br>
                        {{ state }} -->
                        <!-- <hr> -->
                        <div class="sect-fecha">
                            <div class="ttl">Eventos disponibles</div>
                            <select class="selectpicker form-control" v-model="state.Order.day">
                                <option :value="ev.id" v-for="(ev, key) in state.Events" :key="key">{{ ev.month }} - {{
                                    ev.day
                                }}
                                </option>
                            </select>
                        </div>

                        <div class="descDay">

                            <div class="ttl">{{ state.Events.filter(e => e.id == state.Order.day)[0]?.name }}</div>
                            <div class="desc">{{ state.Events.filter(e => e.id == state.Order.day)[0]?.desc }}</div>
                            <br>
                        </div>
                        <div class="ord">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="text" class="form-control" id="floatingName"
                                    v-model="state.Order.cant">
                                <label for="floatingName">Cantidad</label>
                            </div>
                        </div>

                        <div class="sect-time">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="time" class="form-control" id="floatingTime"
                                    v-model="state.Order.hour">
                                <label for="floatingTime">Hora</label>
                            </div>
                        </div>
                        <!-- <hr> -->
                        <!-- {{ state.Events.filter(e => e.id == state.Order.day) }} -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="sendData">Crear</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="som"></div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { eventsComp } from '../composables/events'
import { ordersComp } from '../composables/orders'

export default {
    props: {
        createOrderData: Object
    },
    setup(props, ctx) {
        var createOrderData = reactive(props.createOrderData)
        const { readEvents } = eventsComp()
        const { createOrder } = ordersComp()

        const state = reactive({
            Events: [],
            Order: {}
        })

        const processOrderData = () => {
            let data = createOrderData;
            return {
                open: data.open,
                idClient: data.idClient,
                nombreClient: data.nombreClient,
                fecOrder: state.Order.day,
                cantOrder: state.Order.cant,
                hourOrder: state.Order.hour
            }
        }

        const loadEvents = async () => {
            let eventsList = await readEvents('active')
            if (eventsList.status) {
                eventsList.events.forEach(ev => {
                    let evPro = {}
                    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                    evPro.id = ev.id
                    evPro.month = months[parseInt(ev.dateOn.split('-')[1]) - 1]
                    evPro.day = ev.dateOn.split('-')[2]
                    evPro.name = ev.nombre
                    evPro.desc = ev.descripcion
                    state.Events.push(evPro)
                });
            }
        }
        loadEvents()

        const createOrderFunction = async (data) => {
            return await createOrder(data);
        }

        const closeModal = async (p) => {
            if (['modal fade show d-block', 'btn btn-secondary', 'btn-close'].includes(p.srcElement.className)) {
                // cerrar modal de creacion de pedido
                ctx.emit('statusOrder', 0)
            } else if (p.srcElement.className == 'btn btn-primary') {
                // realizar pedido
                let res = await createOrderFunction(processOrderData())
                ctx.emit('statusOrder', {status: res.status})
            } else {
                // No pasa nada
            }
        }
        return {
            createOrderData,
            closeModal,
            state
        }
    },
}
</script>

<style lang="scss">
.createOrder {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;

    z-index: 1000;

    .som {
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: black;
        opacity: 0.3;
    }
}
</style>