import { Provider } from "react-redux";

import { store } from "./app/store";
import { ToastContainer } from "react-toastify";
import MyRoutes from "./CustomeRoutes";

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <MyRoutes />
      </Provider>
    </>
  );
}

export default App;
