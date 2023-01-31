import ApiService from "@/core/api.service";
export function eventsComp() {

    const createEvent = async (event) => {

        const res = await ApiService.post(
            "/event/create",
            event
        )

        if (res.data && res.data.message == 'create_ok') {
            return true
        } else {
            if(res.response.data.message == 'ex_event'){
                return 'ex_event'
            } else {
                return false
            }
        }

    }

    const readEvents = async () => {
        const res = await ApiService.get(
            "/events/list"
        )

        if(res.data && res?.data?.message == 'list_ok'){
            return {
                status: true,
                events: res.data.data
            }
        } else {
            return {
                status: false
            }
        }

        return res
    }

    return {
        createEvent,
        readEvents
    }
}