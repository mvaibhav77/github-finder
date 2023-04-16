import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import { GithubProvider } from "./context/GithubContext";
import { AlertProvider } from "./context/AlertContext";
import Alert from "./components/layout/Alert";
import User from "./pages/User";

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container px-3 pb-12 mx-auto">
              <Routes>
                <Route path='/' element={
                  <>
                    <Alert />
                    <Home />
                  </>
                } />
                <Route path='/about' element={<About />} />
                <Route path='/user/:login' element={<User />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>

  );
}

export default App;
