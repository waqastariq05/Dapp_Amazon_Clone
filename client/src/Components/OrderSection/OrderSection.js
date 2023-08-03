import React, { useContext, useEffect, useState } from 'react'
import '../OrderSection/OrderSection.css'
import DappazonContext from '../../Context/DappazonContext';
import { ethers } from 'ethers';
import ViewOrder from './ViewOrder';

const OrderSection = () => {
    const contex = useContext(DappazonContext);
    const { contract, orders, getOrder, getCategory, category } = contex;

    useEffect(() => {
        contract && getOrder();
        contract && getCategory();
    }, [contract])

    let id = 1;

    const [toggle, setToggle] = useState(false)
    const [orderDetail, setOrderDetail] = useState({ id: null, data: null, cate: null })
    const togglePop = (id, data, cate) => {
        setOrderDetail({ id, data, cate })
        toggle ? setToggle(false) : setToggle(true)
    }

    return (
        <div className='orderSection'>
            <div className='container'>
                <div class="top">

                    <h2>Order List</h2>
                </div>
                {/* </div>
            <div className='container-fluid'> */}
                <div className="body table-responsive">
                    <table class="table table-dark table-hover table-bordered text-center">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Buyer</th>
                                <th scope="col">Address</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {orders && orders.map((e) => {
                                const cost = ethers.formatEther(e.cost)
                                let newCate;
                                for (let index = 0; index < category.length; index++) {
                                    if (category[index].id === e.cateId) {
                                        newCate = category[index].name;
                                    }
                                }
                                return (
                                    <tr>
                                        <td>{id++}</td>
                                        <td>{e.buyer.slice(0, 6) + '...' + e.buyer.slice(38, 42)}</td>
                                        <td>{e.buyerAdd.slice(0, 20)}...</td>
                                        <td>{e.name}</td>
                                        <td>{parseInt(e.quantity)}</td>
                                        <td>{cost}</td>
                                        <td><button type='button' className="btn" onClick={() => togglePop(id, e, newCate)} >View</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {toggle && (
                <ViewOrder orderDetail={orderDetail} togglePop={togglePop} />
            )}
        </div>
    )
}

export default OrderSection
