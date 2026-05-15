import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Register from "./Component/Register";
import TaskManagement from "./Component/TaskManagement";
import Header from "./Component/Header";
import Footer from "./Component/Footer";

import { useSelector } from "react-redux";
import Location from "./Component/Location";

function App() {
  const user = useSelector((state) => state.users.user);

  return (
    <Router>
      <div className="App">
        <Header />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            {/* المسارات العامة */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* المسارات المحمية (تطلب تسجيل دخول) */}
            <Route path="/" element={<Home />} />
            <Route path="/addTask" element={<TaskManagement />} />
            <Route path="/updateTask/:id" element={<TaskManagement />} />
            <Route path="/location" element={<Location />} />
          
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;