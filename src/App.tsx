import { Routes, Route, Navigate } from "react-router-dom";
import { ShoppingListDetail } from "./routes/shopping-list/ShoppingListDetail";
import { ListOverview } from "./routes/list-overview/ListOverview.tsx";

function App() {

  return (
      <Routes>
          <Route path="/" element={<ListOverview />} />
          <Route path="/lists/:id" element={<ShoppingListDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  )
}

export default App
