import React, { useState } from 'react'
import '../Modal/Modal.css'

const CategoryModal = (props) => {
    const [category, setCategory] = useState({ id: 0, name: "" });
    const { provider, contract, showAlert, addTogglePop } = props;

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const signer = await provider.getSigner();
            let transaction = await contract.connect(signer).addCategory(parseInt(category.id), category.name);
            await transaction.wait();
            setCategory({ id: 0, name: null })
            addTogglePop();
            showAlert("Category is added successfully.", "success")
        } catch (error) {
            addTogglePop();
            showAlert("Category is not added successfully.", "warning")
        }
    }

    const change = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }
    return (
        <>
            {/* Add Category */}
            <div class="box shadow">
                <div class="content">
                    <div class="header d-flex align-items-center justify-content-between">
                        <h1 class="title">Add Category</h1>
                        <button type="button" class="btn-close" onClick={addTogglePop}></button>
                    </div>
                    <form onSubmit={handleAddCategory}>
                        <div class="body">
                            <div className='mb-3'>
                                <label for="cateID" class="form-label">Category Id</label>
                                <input type="number" class="form-control" id="cateID" name='id' value={category.id} onChange={change} required />
                            </div>
                            <div>
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" placeholder='Enter category name' value={category.name} onChange={change} name='name' required />
                            </div>
                        </div>
                        <div class="footer">
                            <button type="button" class="btn btnClose" onClick={addTogglePop}>Close</button>
                            <button type="submit" class="btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='overlay' onClick={addTogglePop}></div>
        </>
    )
}

export default CategoryModal

