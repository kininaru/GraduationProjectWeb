import React, { Component } from "react"
import { Button, Checkbox, Form, Input, Select } from 'antd'

import { fetchOrganizations } from "../server/Organization"
import { postServer } from "../server/Server"
import { toFormData } from "../utils/Data"
import { openNotification } from "../utils/Notification"
import { withRouter } from "react-router-dom"

class SignUpPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            organizations: null,
        }

        fetchOrganizations().then(orgs => {
            this.setState({ organizations: orgs })
        })
    }

    onFinish(values) {
        postServer("/api/sign-up", toFormData(values)).then(resp => {
            if (resp.code !== 0) openNotification("错误", resp.msg)
            else this.props.history.push("/")
        })
    }

    render() {
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
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="组织"
                name="organization"
                rules={[
                    {
                        required: true,
                        message: '请选择你的组织',
                    },
                ]}
            >
                <Select>
                    {this.state.organizations === null ? null : this.state.organizations.map(org => {
                        return <Select.Option value={org.id}>{org.name}</Select.Option>
                    })}
                </Select>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    }
}

export default withRouter(SignUpPage)
