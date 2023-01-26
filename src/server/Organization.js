import {serverHost} from "./Server"

export const fetchOrganizations = () => {
    return fetch(`${serverHost}/api/get-organizations`).then(r => r.json()).then(resp => {
        return resp.data
    })
}