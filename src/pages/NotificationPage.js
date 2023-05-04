import { message, Table } from "antd";
import React from "react";
import { getServer } from "../server/Server";
import { openNotification } from "../utils/Notification";

class NotificationPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications: null,
    }

    getServer(`/api/get-notifications`).then(resp => {
      if (resp.code !== 0) openNotification("错误", resp.msg)
      else this.setState({ notifications: resp.data })
    })
  }

  render() {
    const columns = [
      {
        title: '时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: timestamp => {
          let date = new Date(timestamp * 1000)
          return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`
        }
      },
      {
        title: '发送人',
        dataIndex: 'from',
        key: 'from',
        render: from => from.name
      },
      {
        title: '状态',
        dataIndex: 'read',
        key: 'read',
        render: read => read ? "已读" : "未读"
      },
      {
        title: '通知内容',
        dataIndex: 'message',
        key: 'message',
        render: message => message,
      },
    ];

    if (this.state.notifications === null) return "通知加载中..."
    return <Table columns={columns} dataSource={this.state.notifications} />
  }
}

export default NotificationPage