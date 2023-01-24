import { notificationChannel } from "../utils/Notification"
import { serverHost } from "./Server"

export const fetchAccount = () => {
    fetch(`${serverHost}/api/account`).then(resp => resp.json()).then(resp => {
        if (resp.code !== 0) {
            notificationChannel.insert("error", resp.msg)
            return null
        }
        return resp.data
    })
}
