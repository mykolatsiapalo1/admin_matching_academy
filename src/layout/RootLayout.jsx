import { Outlet } from "react-router-dom";
import Sidebar from "./partials/sidebar";
import Header from "./partials/header";
import Settings from "./partials/Settings";
import { useState } from "react";
// import Header from "./partials/header";

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode);
  }

  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <Sidebar />
      {/* <Settings setDataTheme={setDarkMode} /> */}
      <div className={`lg:ml-64 `}>
        {/* <Header /> */}
        <Outlet />
      </div>
    </div>
  )
}
