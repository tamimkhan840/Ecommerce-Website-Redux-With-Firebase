import { Route,  Routes } from "react-router"
import DashboardLayout from "./layout/DashboardLayout"
import HomeDashboard from "./Pages/HomeDashboard"
import Error from "./Error"
import CreateCategory from "./Pages/CreateCategory"
import CreateProduct from "./Pages/CreateProduct"


function App() {

  return (
    <>
      <Routes>
          <Route path="/"  element={<DashboardLayout />}>
            <Route index  element={<HomeDashboard />}/>
            <Route path="/create-product" element={<CreateProduct />}/>
            <Route path="/create-category"  element={<CreateCategory />}/>
            <Route path="/edit-category/:id"  element={<CreateCategory />}/>
            {/* Error */}

            <Route path="/*" element={<Error />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
