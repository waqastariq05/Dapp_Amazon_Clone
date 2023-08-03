import React, { useContext } from 'react'
import AdminNavbar from '../Components/Navbar/AdminNavbar'
import { Route, Routes } from 'react-router-dom'
import ProductSection from '../Components/ProductSection/ProductSection'
import CategorySection from '../Components/CategorySection/CategorySection'
import Dashboard from '../Components/Dashboard/Dashboard'
import OrderSection from '../Components/OrderSection/OrderSection'
import Alert from '../Components/Alert/Alert'
import DappazonContext from '../Context/DappazonContext'

const Admin = () => {
    const contex = useContext(DappazonContext);
    const { alert } = contex;

    return (
        <div className='admin'>
            <AdminNavbar />
            <Alert alert={alert} />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/category' element={<CategorySection />} />
                <Route path='/product' element={<ProductSection />} />
                <Route path='/order' element={<OrderSection />} />
            </Routes>
        </div>
    )
}

export default Admin
