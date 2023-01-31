<template>
    <div class="createDateEvent">
        <div class="card m-auto" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Crear evento</h5>
                <div class="row mb-2">
                    <p class="mb-0">Nombre del evento</p>
                    <input type="text" class="form-control" v-model="event.nombre">
                </div>

                <div class="row mb-2">
                    <p class="mb-0">Descripcion del evento</p>
                    <input type="text" class="form-control" v-model="event.descripcion">
                </div>

                <div class="row mb-2">
                    <p class="mb-0">Fecha del evento</p>
                    <Datepicker v-model="event.date" :enable-time-picker="false" :min-date="event.date"
                        format="dd/MM/yyyy" />
                </div>

                <button class="btn btn-sm btn-primary d-block mt-2 m-auto" @click="saveEvent">Guardar
                    <i class="bi bi-save"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, reactive } from 'vue'
import { eventsComp } from '../composables/events'

export default {
    name: 'createDateEvent',
    components: { Datepicker },
    setup(props, ctx) {
        const { createEvent } = eventsComp()
        const event = reactive({
            nombre: 'Buñuelos',
            descripcion: 'Venta de buñuelos',
            date: new Date()
        })

        const saveEvent = async () => {
            let ev = await createEvent(processEventData())
            if (ev != true) {
                if (ev == 'ex_event') {
                    ctx.emit('createEvent', 'ex_event')
                } else {
                    ctx.emit('createEvent', 'err_create_event')
                }
            } else {
                ctx.emit('createEvent', true)
            }
        }

        const processEventData = () => {
            let data = event;
            return {
                nombre: data.nombre,
                descripcion: data.descripcion,
                date: data.date,
                dateOn: data.date.getFullYear() + '/' + data.date.getMonth()+1 + '/' + data.date.getDate()
            }
        }

        return {
            event,
            saveEvent
        }
    },
}
</script>

<style lang="scss">
.createDateEvent {
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

        &.form-control {
            padding: 0;
            width: 90%;
            margin: auto;
        }
    }
}
</style>