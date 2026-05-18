import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./routes/protected.routes";
import Auth from "./pages/auth";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/auth"
          element={<Auth />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;