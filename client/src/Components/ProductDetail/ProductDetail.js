import React, { useContext, useEffect, useState } from 'react'
import '../ProductDetail/ProductDetail.css'
import solidStar from '../../assets/star-solid.svg'
import regularStar from '../../assets/star-regular.svg'
import { ethers } from 'ethers';
import DappazonContext from '../../Context/DappazonContext';


const ProductDetail = (props) => {
    const contex = useContext(DappazonContext);
    const { provider, connected, contract, account } = contex;
    const { item, togglePop } = props;

    const cost = ethers.formatEther(item.cost);

    const elements = [];
    for (let i = 1; i <= item.quantity; i++) {
        elements.push(<option value={i}>{i}</option>);
    }

    const [order, setOrder] = useState(null)
    const [hasBought, setHasBought] = useState(false)

    const fetchDetails = async () => {
        const events = await contract.queryFilter("Buy")
        const orders = events.filter(
            (event) => event.args.buyer === account && parseInt(event.args.itemId) === parseInt(item.id)
        )

        if (orders.length === 0) return

        const order = await contract.orders(account, orders[0].args.orderId)
        setOrder(order)
    }

    const [add, setAdd] = useState("")
    const buyHandler = async (e) => {
        e.preventDefault();
        const qty = document.getElementById("qty");
        const val = qty.value
        let totalCost = cost * val;
        let costToWie = ethers.parseUnits(String(totalCost))
        const signer = await provider.getSigner();
        try {
            let transaction = await contract.connect(signer).buyProduct(item.id, val, add, { value: costToWie })
            await transaction.wait()
            setAdd(null)
        } catch (error) {
            alert("Can not buy")
        }
        setHasBought(true)
    }

    const change = (e) => {
        setAdd(e.target.value);
    }

    useEffect(() => {
        fetchDetails()
    }, [hasBought])

    return (
        <>
            <div className='productDetail shadow'>
                <div className='close' onClick={togglePop}>
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <div className='row'>
                    <div className="col-md-4 left">
                        <img src={`https://gateway.pinata.cloud/ipfs/${item.imageUrl.substring(6)}`} alt="" className='img-fluid' />
                    </div>
                    <div className="col-md-4 mid">
                        <h2 className='title'>{item.name}</h2>
                        <div className='star'>
                            <img src={item.rating >= 1 ? solidStar : regularStar} class="img-fluid" alt="star" />
                            <img src={item.rating >= 2 ? solidStar : regularStar} class="img-fluid" alt="star" />
                            <img src={item.rating >= 3 ? solidStar : regularStar} class="img-fluid" alt="star" />
                            <img src={item.rating >= 4 ? solidStar : regularStar} class="img-fluid" alt="star" />
                            <img src={item.rating >= 5 ? solidStar : regularStar} class="img-fluid" alt="star" />
                        </div>
                        <h3 className='price'>{cost} ETH</h3>
                        <div className='body'>
                            <h2>Overview</h2>
                            <p className='text'>{item.desc}</p>
                        </div>
                    </div>
                    <div className="col-md-4 right">
                        <div className='d-flex align-items-center justify-content-between'>
                            <h2 className='price'>{cost} ETH</h2>
                            {item.quantity > 0 ? (
                                <p className="stock">In Stock</p>
                            ) : (
                                <p className="stock">Out Of Stock</p>
                            )}
                        </div>

                        <h4>Free Delivery</h4>
                        <h3 className="date">{new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                        <form onSubmit={buyHandler}>
                            <div class="row align-items-center qty">
                                <div class="col">
                                    <label htmlFor="qty">Quantity</label>
                                </div>
                                <div class="col">
                                    <select class="form-select" aria-label="qty" id='qty' required>
                                        <option selected>0</option>
                                        {elements}
                                    </select>
                                </div>
                            </div>
                            <input type="text" class="form-control" placeholder='Delivery Address' required value={add} onChange={change} />
                            {item.quantity > 0 ? (
                                <button className="btn" disabled={!connected}>{connected ? "Buy Now" : "Connect MetaMask To Buy"}</button>
                            ) : (
                                <button className="btn" disabled={item.quantity <= 0}>Buy Now</button>
                            )}
                        </form>
                        <p>Ships from Dappzone</p>
                        <p>Sold by Dappzone</p>

                        {order && (
                            <div className='productBought'>
                                Item bought on <br />
                                <strong>
                                    {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                                        undefined,
                                        {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                </strong>
                            </div>
                        )}
                    </div>
                </div>
            </div >
            <div className='overlay' onClick={togglePop}></div>
        </>
    )
}

export default ProductDetail

