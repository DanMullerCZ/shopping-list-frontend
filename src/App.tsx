import { Routes, Route, Navigate } from "react-router-dom";
import { ShoppingListDetail } from "./routes/shopping-list/ShoppingListDetail";

function App() {

  return (
      <Routes>
          <Route path="/" element={<Navigate to="/lists/1" replace />} />
          <Route path="/lists/:id" element={<ShoppingListDetail />} />
      </Routes>
  )
}

export default App
