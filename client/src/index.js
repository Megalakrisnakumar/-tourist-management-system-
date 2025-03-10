import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// CSS Imports - Maintain consistent order for styling frameworks
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 'leaflet/dist/leaflet.css'; 


// Context & Routing
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>
);
