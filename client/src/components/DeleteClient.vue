<template>
    <div class="deleteClient">
        <div class="modal fade show d-block" @click="closeModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Quieres eliminar este cliente?</h1>
                        <button type="button" class="btn-close"></button>
                    </div>
                    <div class="modal-body">
                        {{ deleteClientData.nombre }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary">Cancelar</button>
                        <button type="button" class="btn btn-danger" @click="deleteCli()">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="som"></div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { clientsComp } from '../composables/clients'

export default {
    props: {
        deleteClientData: Object
    },
    setup(props, ctx) {
        var deleteClientData = reactive(props.deleteClientData)
        const state = reactive({

        })

        const { deleteClient } = clientsComp()

        const deleteCli = async () => {
            let res = await deleteClient(deleteClientData.id)
            ctx.emit('statusClient', res)
        }

        const closeModal = async (p) => {
            if (['modal fade show d-block', 'btn btn-secondary', 'btn-close'].includes(p.srcElement.className)) {
                // cerrar modal de creacion de pedido
                ctx.emit('statusClient', 0)
            } else {
                // No pasa nada
            }
        }

        return {
            deleteClientData,
            deleteCli,
            closeModal,
            state
        }

    },
}
</script>

<style lang="scss">
.deleteClient {
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