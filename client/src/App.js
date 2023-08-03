import { useContext, useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import { Route, Routes } from 'react-router-dom'
import DappazonContext from './Context/DappazonContext';
import SearchProduct from './Components/SearchProduct/SearchProduct';
import ProductDetail from './Components/ProductDetail/ProductDetail';

function App() {
  const contex = useContext(DappazonContext);
  const { contract, isAdmin, checkAdmin, getAdmin } = contex;

  useEffect(() => {
    contract && getAdmin()
  }, [contract])

  useEffect(() => {
    isAdmin()
  })

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
    console.log(toggle)
  }

  return (
    <div className="App">
      <Routes>
        {checkAdmin === true ?
          (<Route path='/*' element={<Admin />} />)
          : (
            <Route path='/' element={<Home togglePop={togglePop} />} />
          )
        }
        <Route path='/search/:data' element={<SearchProduct togglePop={togglePop} />} />
      </Routes>
      {toggle && (
        <ProductDetail item={item} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;
