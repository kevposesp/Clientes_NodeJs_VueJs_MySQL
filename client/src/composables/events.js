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

    return {
        createEvent
    }
}