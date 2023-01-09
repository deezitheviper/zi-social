
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


const router = createBrowserRouter([
  {
    path: "/Login", 
    element: <Login/> 
  },
  {
    path: "/Register",
    element: <Register/>,
  },
]);

function App() {
  return (
    <div>
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
