<template>
    <div class="createClient">
        <div class="modal fade show d-block" @click="closeModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Crear cliente?</h1>
                        <button type="button" class="btn-close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="ord">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="text" class="form-control" id="floatingName"
                                    v-model="state.Client.nombre">
                                <label for="floatingName">Nombre</label>
                            </div>
                        </div>
                        <div class="ord">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="text" class="form-control" id="floatingDir"
                                    v-model="state.Client.dir">
                                <label for="floatingDir">Direccion</label>
                            </div>
                        </div>
                        <div class="ord">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="text" class="form-control" id="floatingNota"
                                    v-model="state.Client.nota">
                                <label for="floatingNota">Nota</label>
                            </div>
                        </div>
                        <div class="ord">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="text" class="form-control" id="floatingTelf"
                                    v-model="state.Client.telf">
                                <label for="floatingTelf">Telefono</label>
                            </div>
                        </div>
                        <div class="ord">
                            <div class="form-floating mb-3 col-md col-12">
                                <input type="text" class="form-control" id="floatingTelf2"
                                    v-model="state.Client.telf2">
                                <label for="floatingTelf2">Telefono 2 (op)</label>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary">Cancelar</button>
                        <button type="button" class="btn btn-primary">Crear</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="som"></div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import { clientsComp } from '../composables/clients'

export default {
    setup(props, ctx) {
        const state = reactive({
            Client: {}
        })

        const { createClient } = clientsComp()

        const processClientData = () => {
            let data = state.Client;
            return {
                nombreClient: data.nombre,
                dirClient: data.dir,
                notaClient: data.nota,
                telfClient: data.telf,
                telfClient2: data.telf2
            }
        }

        const createClientFunction = async (data) => {
            return await createClient(data);
        }

        const closeModal = async (p) => {
            if (['modal fade show d-block', 'btn btn-secondary', 'btn-close'].includes(p.srcElement.className)) {
                // cerrar modal de creacion de pedido
                ctx.emit('statusClient', 0)
            } else if (p.srcElement.className == 'btn btn-primary') {
                // realizar pedido
                let res = await createClientFunction(processClientData())
                ctx.emit('statusClient', {status: res.status})
            } else {
                // No pasa nada
            }
        }

        return {
            closeModal,
            state
        }
    },
}
</script>

<style lang="scss">
.createClient {
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