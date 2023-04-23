import React, { Component } from "react"
import { Button, Checkbox, Form, Input, Select } from 'antd'

import { postServer } from "../server/Server"
import { toFormData } from "../utils/Data"
import { openNotification } from "../utils/Notification"
import { withRouter } from "react-router-dom"

class SignInPage extends React.Component {
    constructor(props) {
        super(props)
    }

    onFinish(values) {
        postServer("/api/sign-in", toFormData(values)).then(resp => {
            if (resp.code !== 0) openNotification("错误", resp.msg)
            else {
                this.props.onSignFinished(resp.data)
                this.props.history.push("/")
            }
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
                label="ID"
                name="id"
                rules={[
                    {
                        required: true,
                        message: '请输入 id',
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

export default withRouter(SignInPage)
