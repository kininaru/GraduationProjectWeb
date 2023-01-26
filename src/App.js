import React from "react"
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom"
import { Breadcrumb, Layout, Menu, theme } from 'antd'

import { getServer } from "./server/Server"
import MainPage from "./pages/MainPage"
import { openNotification } from "./utils/Notification"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import AccountPage from "./pages/AccountPage"

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
        }]}
      />
      <Content style={{ padding: '50px', float: 'center' }}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/sign-in" render={() => <SignInPage onSignFinished={account => {
            this.setState({
              account: account
            })
          }}/>} />
          <Route exact path="/account" render={() => <AccountPage account={this.state.account}/>} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  }
}

export default withRouter(App)