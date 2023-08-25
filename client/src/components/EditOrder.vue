<template>
    <div class="editOrder">
        <div class="modal fade show d-block" @click="closeModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Editar pedido de {{ editOrderData.nombreClient }}?</h1>
                        <button type="button" class="btn-close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="sect-fecha ord">
                            <div class="ttl">Estado del pedido</div>
                            <select class="selectpicker form-control mb-3" v-model="editOrderData.status">
                                <option :value="ev.id" v-for="(ev, key) in state.avaibleStates" :key="key">{{ ev.name }}
                                </option>
                            </select>
                        </div>
                        
                        <div class="ord">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="text" class="form-control" id="floatingDir"
                                    v-model="editOrderData.direccion">
                                <label for="floatingDir">Direccion</label>
                            </div>
                        </div>
                        
                        <div class="ord">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="text" class="form-control" id="floatingNota"
                                    v-model="editOrderData.nota">
                                <label for="floatingNota">Nota Pedido</label>
                            </div>
                        </div>

                        <div class="sect-time">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="time" class="form-control" id="floatingTime"
                                    v-model="editOrderData.horaPedido">
                                <label for="floatingTime">Hora</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary">Cancelar</button>
                        <button type="button" class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="som"></div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { ordersComp } from '../composables/orders'

export default {
    props: {
        editOrderData: Object
    },
    setup(props, ctx) {
        var editOrderData = reactive(props.editOrderData)
        const { editOrder } = ordersComp()

        const state = reactive({
            avaibleStates: [
                {
                    id: 0,
                    name: "Pendiente"
                },
                {
                    id: 1,
                    name: "En reparto"
                },
                {
                    id: 2,
                    name: "Pendiente de pago"
                },
                {
                    id: 3,
                    name: "Completado"
                },
                {
                    id: 4,
                    name: "Cancelado"
                },
                {
                    id: 5,
                    name: "Preparado"
                }
            ]
        })

        const processOrderData = () => {
            let data = editOrderData;
            return {
                orderId: data.orderId,
                status: data.status,
                hourOrder: data.horaPedido,
                dirOrder: data.direccion,
                notaOrder: data.nota
            }
        }

        const editOrderFunction = async (data) => {
            return await editOrder(data);
        }

        const closeModal = async (p) => {
            if (['modal fade show d-block', 'btn btn-secondary', 'btn-close'].includes(p.srcElement.className)) {
                // cerrar modal de creacion de pedido
                ctx.emit('statusOrder', 0)
            } else if (p.srcElement.className == 'btn btn-primary') {
                // realizar pedido
                let res = await editOrderFunction(processOrderData())
                ctx.emit('statusOrder', {status: res.status})
            } else {
                // No pasa nada
            }
        }
        return {
            editOrderData,
            closeModal,
            state
        }
    },
}
</script>

<style lang="scss">
.editOrder {
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