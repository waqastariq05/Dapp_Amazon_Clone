import React, { useContext, useEffect, useState } from 'react'
import '../Modal/Modal.css'
import DappazonContext from '../../Context/DappazonContext';
import axios from "axios";
const { ethers } = require('ethers');

const UpdateProductModal = (props) => {
    const contex = useContext(DappazonContext);
    const { provider, contract, category, getCategory, showAlert } = contex;
    const { updateTogglePop, data } = props;
    const price = ethers.formatEther(data.cost)

    const [product, setProduct] = useState(
        { id: parseInt(data.id), name: data.name, desc: data.desc, quantity: parseInt(data.quantity), price: price, rating: parseInt(data.rating) }
    )
    const [file, setFile] = useState(null);
    const [cateId, setCateID] = useState(parseInt(data.cateId));

    useEffect(() => {
        contract && getCategory();
    }, [contract])

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        // 'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
                        'pinata_api_key': "2bfb89a83938cfd1d8a5",
                        // 'pinata_secret_api_key': process.env.REACT_APP_PINATA_API_SECRET,
                        'pinata_secret_api_key': "fb79906ac3de2b1d5244669c4770c7d648af359b081a1016fdd77091423daa14",
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                const cost = ethers.parseUnits(product.price)

                const signer = await provider.getSigner();
                await contract.connect(signer).updateProduct(product.id, product.name, product.desc, ImgHash, parseInt(cateId), parseInt(product.quantity), cost, parseInt(product.rating));

                setFile(null);
                setProduct({ id: 0, name: null, desc: null, quantity: null, price: null, rating: null })
                setCateID(null)
                updateTogglePop();
                showAlert("Product is Updated successfully.", "success")
            }
            catch {
                updateTogglePop();
                showAlert("Product is not Updated successfully.", "warning")
            }
        }
    }

    const getFileData = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
    }

    const changeOption = (e) => {
        setCateID(e.target.value)
    }

    const change = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* Update Product Modal */}
            <div class="box shadow">
                <div class="content">
                    <div class="header d-flex align-items-center justify-content-between">
                        <h1 class="title">Update Product</h1>
                        <button type="button" class="btn-close" onClick={updateTogglePop}></button>
                    </div>
                    <form onSubmit={handleUpdateProduct}>
                        <div class="body row g-3">
                            <div class="col-md-6">
                                <label for="id" class="form-label">Product ID</label>
                                <input type="number" class="form-control" id="id" name='id' value={product.id} disabled />
                            </div>
                            <div class="col-md-6">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" name='name' value={product.name} onChange={change} required />
                            </div>
                            <div class="col-md-12">
                                <label for="desc" class="form-label">Description</label>
                                <input type='text' class="form-control" id="desc" name='desc' value={product.desc} onChange={change} required />
                            </div>
                            <div class="col-md-6">
                                <label for="quantity" class="form-label">Quantity</label>
                                <input type="number" class="form-control" id="quantity" name='quantity' value={product.quantity} onChange={change} required />
                            </div>
                            <div class="col-md-6">
                                <label for="price" class="form-label">Price</label>
                                <input type="number" class="form-control" id="price" name='price' value={product.price} onChange={change} required />
                            </div>
                            <div class="col-md-6">
                                <label for="category" class="form-label">Category</label>
                                <select id="category" value={cateId} class="form-select" required onChange={changeOption}>
                                    <option value="0" >Choose Category</option>
                                    {category && category.map((cate) => {
                                        return (<option value={parseInt(cate.id)} >{cate.name}</option>)
                                    })}
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="rating" class="form-label">Rating</label>
                                <input type="number" class="form-control" id="rating" name='rating' value={product.rating} onChange={change} required />
                            </div>
                            <div class="col-12">
                                <label for="img" class="form-label">Image</label>
                                <input type="file" class="form-control" id="img" required onChange={getFileData} />
                            </div>
                        </div>
                        <div class="footer">
                            <button type="button" class="btn btnClose" onClick={updateTogglePop}>Close</button>
                            <button type="submit" class="btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div >
            <div className='overlay' onClick={updateTogglePop}></div>
        </>
    )
}

export default UpdateProductModal
