import { Route, Routes } from "react-router";
import { HomePage } from "./pages/home/Home";
import { AuthPage } from "./pages/auth/Auth";

function App() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route path="/visor" element={<HomePage />} />
    </Routes>
  );
}

export default App;
