import { Space, Table, Tag } from "antd";
import React from "react";
import { getServer } from "../server/Server";
import { openNotification } from "../utils/Notification";

class SupplyRecordPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            records: null,
        }

        getServer(`/api/get-supply-records`).then(resp => {
            if (resp.code !== 0) openNotification("错误", resp.msg)
            else this.setState({records: resp.data,})
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
                return `${date.getFullYear()} 年 ${date.getMonth()+1} 月 ${date.getDate()} 日`
              }
            },
            {
              title: '数量',
              dataIndex: 'amount',
              key: 'amount',
              render: amount => amount > 0 ? amount : -amount
            },
            {
              title: '类型',
              dataIndex: 'amount',
              key: 'type',
              render: () => "补充物资"
            },
            {
              title: '状态',
              dataIndex: 'gap',
              key: 'status',
              render: gap => gap === 0 ? "已完成" : "剩余 " + gap + " 件待处理"
            },
          ];
          
        if (this.state.records === null) return "记录加载中..."
        return <Table columns={columns} dataSource={this.state.records} />
    }
}

export default SupplyRecordPage