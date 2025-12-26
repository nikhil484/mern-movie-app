// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import Search from "./pages/Search.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import AdminAddMovie from "./pages/AdminAddMovie.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";
// import AdminManageMovies from "./pages/AdminManageMovies.jsx";
// import AdminEditMovie from "./pages/AdminEditMovie.jsx";

// const App = () => (
//   <AuthProvider>
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/search" element={<Search />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin/add" element={<AdminAddMovie />} />
//         <Route path="/admin/manage" element={<AdminManageMovies />} />
//         <Route path="/admin/edit/:id" element={<AdminEditMovie />} />

//       </Routes>
//     </BrowserRouter>
//   </AuthProvider>
// );

// export default App;
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminAddMovie from "./pages/AdminAddMovie.jsx";
import AdminManageMovies from "./pages/AdminManageMovies.jsx";
import AdminEditMovie from "./pages/AdminEditMovie.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home key={location.key} />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/add" element={<AdminAddMovie />} />
      <Route path="/admin/manage" element={<AdminManageMovies />} />
      <Route path="/admin/edit/:id" element={<AdminEditMovie />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
