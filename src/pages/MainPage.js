import { Link } from "react-router-dom"

import { notificationChannel } from '../utils/Notification'

const MainPage = () => {
    return <button onClick={() => notificationChannel.insert("ok", "test")}>test</button>
    //<Link to={"/login"}>Login</Link>
}

export default MainPage
