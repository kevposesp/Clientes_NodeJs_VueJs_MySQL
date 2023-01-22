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

    return {
        list
    }
}