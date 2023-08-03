import React, { useState } from 'react'
import '../Modal/Modal.css'

const UpdateCategory = (props) => {
    const { provider, contract, data, showAlert, updateTogglePop } = props;
    const [category, setCategory] = useState({ id: parseInt(data.id), name: data.name });

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const signer = await provider.getSigner();
            let transaction = await contract.connect(signer).updateCategory(category.id, category.name);
            await transaction.wait();
            setCategory({ id: 0, name: null })
            updateTogglePop()
            showAlert("Category is Updated successfully.", "success")
        } catch (error) {
            updateTogglePop();
            showAlert("Category is not Updated successfully.", "warning")
        }
    }

    const change = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }
    return (
        <>
            {/* Update Category Modal */}
            <div class="box shadow">
                <div class="content">
                    <div class="header d-flex align-items-center justify-content-between">
                        <h1 class="title">Update Category</h1>
                        <button type="button" class="btn-close" onClick={updateTogglePop}></button>
                    </div>
                    <form onSubmit={handleUpdateCategory}>
                        <div class="body">
                            <div className='mb-3'>
                                <label for="cateID" class="form-label">Category Id</label>
                                <input type="number" class="form-control" id="cateID" name='id' value={category.id} disabled />
                            </div>
                            <div>
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" placeholder='Enter category name' value={category.name} onChange={change} name='name' required />
                            </div>
                        </div>
                        <div class="footer">
                            <button type="button" class="btn btnClose" onClick={updateTogglePop}>Close</button>
                            <button type="submit" class="btn">Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='overlay' onClick={updateTogglePop}></div>
        </>
    )
}

export default UpdateCategory