import { Button, Form, Input, InputNumber, Select } from "antd"
import React from "react"
import { postServer } from "../server/Server"
import { toFormData } from "../utils/Data"
import { openNotification } from "../utils/Notification"

class ResourcePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      requesting: false,
    }
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
      onFinish={v => {
        if (v.type === 'request') v.amount = -v.amount
        this.setState({ requesting: true })
        postServer("/api/add-record", toFormData(v)).then(resp => {
          if (resp.code !== 0) openNotification("错误", resp.msg)
          else {
            openNotification("成功", "您的请求已处理")
            this.setState({ requesting: false })
          }
        })
      }}
      autoComplete="off"
    >
      <Form.Item
        label="物资名"
        name="resourceName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="数量" name="amount" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>

      <Form.Item name="type" label="类型" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="supply">补充物资</Select.Option>
          <Select.Option value="request">请求物资</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" disabled={this.state.requesting}>
          上报
        </Button>
      </Form.Item>
    </Form>
  }
}

export default ResourcePage