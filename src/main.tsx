import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import StarRating from "./components/shared/StarRating/index.tsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      className="test"
      defaultRating={3}
      maxRating={5}
      color="red"
      size={24}
      messages={["Terrible😠", "Bad😐", "Okay😏", "Good😄", "Amazing😮"]}
      onSetRating={(rate) => {
        console.log(rate);
      }}
    />
    <StarRating />
  </React.StrictMode>
);
