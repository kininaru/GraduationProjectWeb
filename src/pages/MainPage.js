import React, { Component } from "react"
import { Link } from "react-router-dom"

class MainPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.account === null) return <Link to={"/login"}>Login</Link>
        return "main page"
    }
}

export default MainPage
