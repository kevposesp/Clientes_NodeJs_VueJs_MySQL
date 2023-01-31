<template>
    <div class="createDateEvent">
        <div class="card m-auto" style="width: 18.5rem;">
            <div class="card-body">
                <h5 class="card-title">Fechas de eventos proximos</h5>
                <Datepicker v-model="state.date" :enable-time-picker="false" inline auto-apply multi-dates
                    :disabled-dates="state.highlightedDates" highlight-disabled-days />
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
    name: 'showDates',
    components: { Datepicker },
    setup(props, ctx) {
        const { readEvents } = eventsComp()
        const state = reactive({
            nombre: 'Buñuelos',
            descripcion: 'Venta de buñuelos',
            date: [],
            highlightedDates: []
        })

        const rEvents = async () => {
            let eventsList = await readEvents()
            if (eventsList.status) {
                eventsList.events.forEach(ev => {
                    state.date.push(ev.date)
                    state.highlightedDates.push(ev.date)
                });
            }
        }
        rEvents()

        return {
            state
        }
    },
}
</script>

<style lang="scss">
.showDates {}
</style>