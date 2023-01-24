import { notificationChannel } from "../utils/Notification"
import { serverHost } from "./Server"

export const fetchAccount = () => {
    return fetch(`${serverHost}/api/account`).then(r => r.json()).then(resp => {
        if (resp.code !== 0) {
            notificationChannel.insert("error", resp.msg)
            return null
        }
        return resp.data
    })
}
