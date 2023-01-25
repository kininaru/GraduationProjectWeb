import { openNotification } from "../utils/Notification"
import { serverHost } from "./Server"

export const fetchAccount = () => {
    return fetch(`${serverHost}/api/account`).then(r => r.json()).then(resp => {
        if (resp.code !== 0) {
            openNotification("请登录", "点击此处登录")
            return null
        }
        return resp.data
    })
}
