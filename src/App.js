import React from "react"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

import { fetchAccount } from "./server/Account"
import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account: null,
        }

        fetchAccount().then(account => {
            this.setState({ account: account })
        })
    }

    render() {
        return <div>
            <RouterProvider router={createBrowserRouter([
                {
                    path: "/",
                    element: <MainPage account={this.state.account} />
                }, {
                    path: "/login",
                    element: <LoginPage />
                }
            ])} />
        </div>
    }
}

export default App