import React from 'react'
import { ethers } from 'ethers';

const ViewOrder = (props) => {
    const { orderDetail, togglePop } = props;
    const cost = ethers.formatEther(orderDetail.data.cost)

    return (
        <>
            <div className='viewOrder shadow'>
                <div className='close' onClick={togglePop}>
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <div class="top">
                    <h2>Order Details</h2>
                </div>
                <div className="body">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`https://gateway.pinata.cloud/ipfs/${orderDetail.data.imageUrl.substring(6)}`} alt="" className='img-fluid' />
                        </div>
                        <div className="col-md-8">
                            <ul>
                                <li>Bought On Date: <span>{new Date(Number(orderDetail.data.time.toString() + '000')).toLocaleDateString(
                                    undefined,
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}</span></li>
                                <li>Buyer Account: <span>{orderDetail.data.buyer}</span></li>
                                <li>Delivery Address: <span>{orderDetail.data.buyerAdd}</span></li>
                                <li>Product Name: <span>{orderDetail.data.name}</span></li>
                                <li>Product Description: <span>{orderDetail.data.desc}</span></li>
                                <li>Category: <span>{orderDetail.cate}</span></li>
                                <li>Quantity: <span>{parseInt(orderDetail.data.quantity)}</span></li>
                                <li>Total Cost: <span>{cost} Eth</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='overlay' onClick={togglePop}></div>
        </>
    )
}

export default ViewOrder

