import AppRoutes from "./routes";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
}

export default App;
