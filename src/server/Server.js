import { openNotification } from "../utils/Notification"

export const serverHost = "http://localhost:80"

export const getServer = async (path, body, headers) => {
    const r = await fetch(`${serverHost}${path}`, {
        method: "GET",
        headers: headers,
        body: body,
        credentials: "include",
    })

    return await r.json()
}

export const postServer = async (path, body, headers) => {
    const r = await fetch(`${serverHost}${path}`, {
        method: "POST",
        headers: headers,
        body: body,
        credentials: "include",
    })

    return await r.json()
}
