import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Line } from "@ant-design/plots"
import { Select } from "antd"
import { getServer } from "../server/Server"

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      requestSummary: [],
      supplySummary: [],
    }

    getServer("/api/get-request-summary").then(resp => this.setState({requestSummary: resp.data}))
    getServer("/api/get-supply-summary").then(resp => this.setState({supplySummary: resp.data}))
    getServer("/api/get-all-resources").then(resp => {
      let resources = []
      resp.data.map(resource => resources.push({value: resource.id, label: resource.name}))
      this.setState({resources: resources})
    })
  }

  requestSummary() {
    let config = {
      data: this.state.requestSummary ? this.state.requestSummary : [],
      xField: "day",
      yField: "value",
      seriesField: "category",
    }
    return <Line style={{ height: "150px" }} {...config} />
  }

  supplySummary() {
    let config = {
      data: this.state.supplySummary ? this.state.supplySummary : [],
      xField: "day",
      yField: "value",
      seriesField: "category",
    }
    return <Line style={{ height: "150px" }} {...config} />
  }

  render() {
    return <div>
      <h1>站点信息总览</h1>
      <hr/>
      <br/>
      <div>点击数据项以单独展示</div>
      <h1>本月需求</h1>
      {this.requestSummary()}
      <h1>本月供应</h1>
      {this.supplySummary()}
      <h1>入库：100 出库：100</h1>
      <div style={{height: "50px"}}/>
    </div>
  }
}

export default MainPage
