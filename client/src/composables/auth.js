import ApiService from "@/core/api.service";
export function authComp() {

    const login = async (usr) => {

        const res = await ApiService.post(
            "/auth/signin",
            usr
        )

        if (res.data) {
            return {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                status: 200
            }
        }

        return false

    }

    return {
        login
    }
}