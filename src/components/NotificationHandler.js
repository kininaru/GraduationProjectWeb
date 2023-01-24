import { Alert, notification } from "antd"
import React, { Component } from "react"

import { notificationChannel } from '../utils/Notification'

const NotificationHandler = () => {
    const [display, setDisplay] = React.useState(null)

    const onNotificationArrived = notification => {
        setDisplay(notification)
        setTimeout(() => {
            setDisplay(null)
        }, 2000)
    }
    notificationChannel.subscribe(onNotificationArrived)

    if (display === null) return null
    return <div style={{ marginBottom: 10 }}>
        <Alert message={display.msg} type={"success"} />
    </div>
}

export default NotificationHandler