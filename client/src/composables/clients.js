import ApiService from "@/core/api.service";
export function clientsComp() {

    const list = async () => {

        const res = await ApiService.get(
            "/clients/list"
        )

        if (res.data && res.data.message == 'list_ok') {
            return {
                clients: res.data.data,
                status: true
            }
        } else {
            return false
        }

    }

    const deleteClient = async (id) => {

        const res = await ApiService.post(
            "/clients/delete",
            {
                id
            }
        )

        return res.data

    }

    const listClient = async (id) => {

        const res = await ApiService.post(
            "/client/list/",
            {id}
        )
        if(res?.data?.message == 'list_ok'){
            return res.data.data
        } else {
            return false
        }

    }
    
    const updateClient = async (client) => {

        const res = await ApiService.post(
            "/client/edit/save/",
            client
        )
        return res
        // if(res?.data?.message == 'list_ok'){
        //     return res.data.data
        // } else {
        //     return false
        // }

    }

    return {
        list,
        deleteClient,
        listClient,
        updateClient
    }
}