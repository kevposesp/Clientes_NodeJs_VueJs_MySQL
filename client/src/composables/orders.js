import ApiService from "@/core/api.service";
export function ordersComp() {

    const readOrders = async () => {
        const res = await ApiService.get(
            "/orders/list"
        )

        if(res.data && res?.data?.message == 'list_ok'){
            return {
                status: true,
                orders: res.data.data
            }
        } else {
            return {
                status: false
            }
        }

        return res
    }

    const createOrder = async (data) => {
        const res = await ApiService.post(
            "/orders/create",
            data
        )
        
        return res
    }

    return {
        readOrders,
        createOrder
    }
}