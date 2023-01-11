import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { DarkModeContext } from "./context/dmContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";




function App() {

  const {currentUser} = useContext(AuthContext);

  const {darkMode} = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        <div style={{display: "flex"}}>
          <Leftbar/>
          <div style={{flex:6}}>
          <Outlet/>
          </div>
          <Rightbar/>
        </div>
      </div>
    )
}

  const ProtectedRoute = ({children}) => {
      if(!currentUser) {
        return <Navigate to="/Login" />
      }
      return children
  }

const router = createBrowserRouter([
  {
    path:"/",
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/Profile/:id",
        element: <Profile/>
      }
    ]
  },
  {
    path: "/Login", 
    element: <Login/> 
  },
  {
    path: "/Register",
    element: <Register/>,
  },
]);

  return (
    <div >
      
    <RouterProvider router={router} />

    </div>
  );
}

export default App;
