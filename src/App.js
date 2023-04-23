import React from "react"
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom"
import { Breadcrumb, Layout, Menu, theme } from 'antd'

import { getServer } from "./server/Server"
import MainPage from "./pages/MainPage"
import { openNotification } from "./utils/Notification"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import AccountPage from "./pages/AccountPage"
import ResourcePage from "./pages/ResourcePage"
import RequestRecordPage from "./pages/RequestRecordPage"
import SupplyRecordPage from "./pages/SupplyRecordPage"
import NotificationPage from "./pages/NotificationPage"
import AdminPage from "./pages/AdminPage"

const { Header, Content, Footer } = Layout
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: null,
    }

    getServer("/api/account").then(resp => {
      if (resp.code !== 0) openNotification("没有登录", "点击此处登录", () => this.props.history.push("/sign-in"))
      else this.setState({ account: resp.data })
    })
  }

  render() {
    return <Layout className="layout">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={[{
          key: "主页",
          label: "主页",
          onClick: () => {
            this.props.history.push("/")
          }
        }, {
          key: "账户",
          label: "账户",
          onClick: () => {
            this.props.history.push("/account")
          }
        }, {
          key: "申报物资",
          label: "申报物资",
          onClick: () => {
            this.props.history.push("/resource")
          }
        }, {
          key: "物资请求记录",
          label: "物资请求记录",
          onClick: () => {
            this.props.history.push("/request")
          }
        }, {
          key: "物资补充记录",
          label: "物资补充记录",
          onClick: () => {
            this.props.history.push("/supply")
          }
        }, {
          key: "通知",
          label: "通知",
          onClick: () => {
            this.props.history.push("/notification")
          }
        }, {
          key: "管理面板",
          label: "管理面板",
          onClick: () => {
            this.props.history.push("/admin")
          },
          disabled: !this.state.account?.admin,
        }]}
      />
      <Content style={{ padding: '50px', float: 'center', background: 'white' }}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/sign-in" render={() => <SignInPage onSignFinished={account => {
            this.setState({
              account: account
            })
          }}/>} />
          <Route exact path="/account" render={() => <AccountPage account={this.state.account}/>} />
          <Route exact path="/resource" component={ResourcePage} />
          <Route exact path="/request" component={RequestRecordPage} />
          <Route exact path="/supply" component={SupplyRecordPage} />
          <Route exact path="/notification" component={NotificationPage} />
          <Route exact path="/admin" render={() => <AdminPage account={this.state.account} />} />
        </Switch>
      </Content>
    </Layout>
  }
}

export default withRouter(App)