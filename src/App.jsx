/** @format */
import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter به جای Router
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Content from "./pages/content/Content";
import { ThemeProvider } from "./store/context/changeTheme";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <div className="contentContainer">
            <Navbar />
            <div className="main">
              <Content />
              <Sidebar />
            </div>
          </div>
          <MusicPlayer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
