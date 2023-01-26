import { notification } from 'antd';

export const openNotification = (title, msg, onClick) => {
  notification.open({
    message: title,
    description: msg,
    onClick: onClick,
  })
}
