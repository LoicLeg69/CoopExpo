import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProvider from "./contexts/UserContext";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <main>
        <Outlet />
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </UserProvider>
  );
}

export default App;
