import React, { Component } from "react"

class MainPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return "main page" + this.props.account
    }
    //<Link to={"/login"}>Login</Link>
}

export default MainPage
