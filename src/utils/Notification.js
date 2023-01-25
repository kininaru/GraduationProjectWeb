import { notification } from 'antd';

export const openNotification = (title, msg) => {
  notification.open({
    message: title,
    description: msg,
    onClick: () => {
      
    },
  })
}

class Notification {
    constructor(type, msg) {
        this.type = type
        this.msg = msg
    }
}

class NotificationQueue {
    constructor() {
        this.subscribers = []
    }

    insert(type, msg) {
        this.subscribers.map(subscriber => {
            subscriber(new Notification(type, msg))
        })
    }

    subscribe(func) {
        let exists = false
        this.subscribers.map(sub => {
            if (sub === func) exists = true
        })
        if (exists) return
        this.subscribers.push(func)
    }
}

export const notificationChannel = new NotificationQueue()
