import React, { Component } from "react"
import { Button, Checkbox, Form, Input, Select } from 'antd'

import { getServer, postServer } from "../server/Server"
import { toFormData } from "../utils/Data"
import { openNotification } from "../utils/Notification"
import { withRouter } from "react-router-dom"

class AccountPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.account === null) return <Button onClick={() => {
            this.props.history.push("/sign-in")
        }}>登录</Button>
        return <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={v => this.onFinish(v)}
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="name"
            >
                {this.props.account.name}
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
            >
                <Button type="default" htmlType="submit">
                    点击更改
                </Button>
            </Form.Item>

            <Form.Item
                label="组织"
                name="organization"
            >
                { this.props.account.organization === null ? "管理员组" : this.props.account.organization.name }
            </Form.Item>
            <Button 
                type="primary" 
                htmlType="submit" 
                style={{marginLeft: 130}}
                onClick={() => {
                    getServer("/api/sign-out").then(() => {
                        window.location.href = "/"
                    })
                }}
            > 退出登录 </Button>
        </Form>
    }
}

export default withRouter(AccountPage)
