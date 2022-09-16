import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit");

localStorage.setItem("user", JSON.stringify("027b4656-bccc-4a0a-9508-6a9ae173bb95"))

ReactDOM.render(<App />, document.getElementById("root"));

// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {}); //runtime download
// }
