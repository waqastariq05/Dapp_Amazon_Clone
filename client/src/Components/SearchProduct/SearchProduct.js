import React, { useContext, useEffect, useState } from 'react'
import DappazonContext from '../../Context/DappazonContext';
import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';

const SearchProduct = (props) => {
    const contex = useContext(DappazonContext);
    const { contract, items, getProduct } = contex;
    const { togglePop } = props;

    useEffect(() => {
        contract && getProduct();
    }, [contract])

    const [item, setItem] = useState(null);
    const getSearchItem = () => {
        let data = window.location.pathname.split("/").pop();
        data = data.replace('-', ' ');
        console.log(data)
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === data) {
                setItem(items[i])
                console.log(items[i])
            }
        }
    };

    useEffect(() => {
        getSearchItem();
    }, [])

    return (
        <>
            <Navbar />
            <div className='product'>
                <div className='container'>
                    <div className='top'>
                        <h2>Dappazon Products</h2>
                    </div>
                    <div className='row mx-2'>
                        <div className="col-md-4" onClick={() => togglePop(item)}>
                            {!item ? "Sorry no result Found"
                                : (<Card img={item.imageUrl.substring(6)} title={item.name} price={item.cost} rating={item.rating} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchProduct
