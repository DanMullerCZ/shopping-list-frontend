import { Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "./components/core/navbar/Navbar.tsx"

import { ShoppingListDetail } from "./routes/shopping-list/ShoppingListDetail";
import { ListOverview } from "./routes/list-overview/ListOverview.tsx";

function App() {

  return (
      <>
        <Navbar />
        <main style={{ padding: 16 }}>
            <Routes>
                <Route path="/" element={<ListOverview />} />
                <Route path="/lists/:id" element={<ShoppingListDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>
      </>
  )
}

export default App
