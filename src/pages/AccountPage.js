import React, { Component } from "react"
import { Button, Checkbox, Form, Input, Select } from 'antd'

import { fetchOrganizations } from "../server/Organization"
import { postServer } from "../server/Server"
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
                <Input defaultValue={this.props.account.name}/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="组织"
                name="organization"
            >
                <Input defaultValue={this.props.account.organization.name}/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    更新
                </Button>
            </Form.Item>
        </Form>
    }
}

export default withRouter(AccountPage)
