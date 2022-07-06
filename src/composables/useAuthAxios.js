import {useAuthUser} from "@/stores/auth/useAuthUser";
import axios from "axios"

export default function (options) {

    const authUser = useAuthUser();

    const token = authUser.token;

    const headers = {
        ...(options?.headers ?? {}),
        ...(token && { Authorization: `Bearer ${token.token}` }),
    };

    return axios.create({
        headers: headers,
    })

};