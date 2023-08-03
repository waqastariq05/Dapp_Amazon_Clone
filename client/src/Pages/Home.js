import React, { useContext } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Product from '../Components/Product/Product';
import DappazonContext from '../Context/DappazonContext';
import Alert from '../Components/Alert/Alert'
import Carousel from '../Components/Carousel/Carousel';

const Home = (props) => {
    const contex = useContext(DappazonContext);
    const { alert } = contex;

    const { togglePop } = props

    return (
        <div>
            <Navbar />
            <Alert alert={alert} />
            <Carousel />
            <Product togglePop={togglePop} />
        </div>
    )
}

export default Home
