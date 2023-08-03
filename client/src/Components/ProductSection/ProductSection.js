import React, { useContext, useEffect, useState } from 'react'
import '../ProductSection/ProductSection.css'
import DappazonContext from '../../Context/DappazonContext';
import AddProduct from '../Modal/AddProduct';
import UpdateProduct from '../Modal/UpdateProduct';
import { ethers } from 'ethers';

const ProductSection = () => {
    const contex = useContext(DappazonContext);
    const { contract, items, getProduct, getCategory, category } = contex;

    useEffect(() => {
        contract && getProduct();
        contract && getCategory();
    }, [contract])

    const [proID, setProID] = useState(null)
    useEffect(() => {
        for (let i = 0; i < items.length; i++) {
            setProID(items[items.length - 1].id)
        }
    }, [])

    const [addToggle, setAddToggle] = useState(false)
    const addTogglePop = () => {
        addToggle ? setAddToggle(false) : setAddToggle(true)
    }

    const [updateToggle, setToggle] = useState(false)
    const [data, setData] = useState(null);
    const updateTogglePop = (item) => {
        setData(item)
        updateToggle ? setToggle(false) : setToggle(true)
    }

    return (
        <div className='productSection'>
            <div className='container'>
                <div class="top">
                    <h2>Products</h2>
                    <button type="button" class="btn" disabled={category.length === 0} onClick={addTogglePop}>
                        {category.length === 0 ? "First Add Category" : "Add Product"}
                    </button>
                </div>
                <div className="body table-responsive">
                    <table class="table table-dark table-hover table-bordered text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Image</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {items && items.map((item) => {
                                const cost = ethers.formatEther(item.cost)
                                let newCateID;
                                for (let index = 0; index < category.length; index++) {
                                    if (category[index].id === item.cateId) {
                                        newCateID = category[index].name;
                                    }
                                }
                                return (
                                    <tr>
                                        <td>{parseInt(item.id)}</td>
                                        <td>{item.name}</td>
                                        <td>{item.desc.slice(0, 20)}...</td>
                                        <td>{newCateID}</td>
                                        <td><img src={`https://gateway.pinata.cloud/ipfs/${item.imageUrl.substring(6)}`} className='img-fluid' /></td>
                                        <td>{parseInt(item.quantity)}</td>
                                        <td>{cost}</td>
                                        <td>{parseInt(item.rating)}</td>
                                        <td><button type='button' className="btn" onClick={() => updateTogglePop(item)}>update</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {addToggle && (
                <AddProduct addTogglePop={addTogglePop} proID={proID} />
            )}
            {updateToggle && (
                <UpdateProduct updateTogglePop={updateTogglePop} data={data} />
            )}
        </div >
    )
}

export default ProductSection
