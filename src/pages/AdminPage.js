import React from "react"
import { withRouter } from "react-router-dom"
import { Button, Table } from "antd"

import { getServer } from "../server/Server"

class AdminPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organizations: [],
    }

    getServer("/api/get-organizations").then(resp => {
      this.setState({ organizations: resp.data })
    })
  }

  render() {
    if (!this.props.account.admin) return "您不是管理员！"
    return <div>
      <h1>组织管理</h1>
      <br/>
      <Table columns={[
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '组织名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '操作',
          render: () => <div>停止新用户注册</div>
        }
      ]} dataSource={this.state.organizations} />
      <Button>添加组织</Button>
    </div>
  }
}

export default withRouter(AdminPage)