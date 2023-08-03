import React, { useContext, useEffect } from 'react'
import Card from '../Card/Card'
import DappazonContext from '../../Context/DappazonContext';

const Product = (props) => {
    const contex = useContext(DappazonContext);
    const { contract, items, getProduct } = contex;
    const { togglePop } = props;

    useEffect(() => {
        contract && getProduct();
    }, [contract])

    return (
        <>
            <div className='product'>
                <div className='container'>
                    <div className="top">
                        <h2>Dappazon Products</h2>
                    </div>
                    <div className='row mx-2'>
                        {items && items.map((item, index) => {
                            return (
                                < div className="col-md-4" key={index} onClick={() => togglePop(item)}>
                                    <Card img={item.imageUrl.substring(6)} title={item.name} price={item.cost} rating={item.rating} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product
