import React, { useState } from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { SignIn } from "./panels/signIn";
import './styles/index.css'
import { SignUp } from "./panels/signUp";
import '@vkontakte/vkui/dist/vkui.css';

// Init VK  Mini App
bridge.send("VKWebAppInit");

const Index = () => {
    const [loged, setLoged] = useState(JSON.parse(localStorage.getItem("user"))) 
    const [willSignUp, setWillSignUp] = useState(false)

    return (
        <>
            {loged && !willSignUp && <App/>}
            {!loged && !willSignUp && <SignIn setLoged={setLoged} onSignUp={setWillSignUp}/>}
            {!loged && willSignUp && <SignUp onClose={() => setWillSignUp(false)} setLoged={setLoged} setWillSignUp={setWillSignUp}/>}
        </>
    )
}

ReactDOM.render(<Index/>, document.getElementById("root"));

// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {}); //runtime download
// }
