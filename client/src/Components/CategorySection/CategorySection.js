import React, { useContext, useEffect, useState } from 'react'
import '../CategorySection/CategorySection.css'
import DappazonContext from '../../Context/DappazonContext';
import AdddCategory from '../Modal/AddCategory';
import UpdateCategory from '../Modal/UpdateCategory';

const CategorySection = () => {
    const contex = useContext(DappazonContext);
    const { provider, contract, category, getCategory, showAlert } = contex;

    useEffect(() => {
        contract && getCategory();
    }, [contract])

    const [addToggle, setAddToggle] = useState(false)
    const addTogglePop = () => {
        addToggle ? setAddToggle(false) : setAddToggle(true)
    }

    const [updateToggle, setToggle] = useState(false)
    const [data, setData] = useState(null);
    const updateTogglePop = (e) => {
        setData(e)
        updateToggle ? setToggle(false) : setToggle(true)
    }

    return (
        <div className='categorySection'>
            <div className='container'>
                <div class="top">
                    <h2>Category</h2>
                    <button type="button" class="btn" onClick={addTogglePop}>
                        Add Category
                    </button>
                </div>
                <div className="body table-responsive">
                    <table class="table table-dark table-hover table-bordered text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {category && category.map((cate) => {
                                return (
                                    <tr>
                                        <td>{parseInt(cate.id)}</td>
                                        <td>{cate.name}</td>
                                        <td><button type='button' className="btn" onClick={() => updateTogglePop(cate)}>update</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {addToggle && (
                <AdddCategory provider={provider} contract={contract} showAlert={showAlert} addTogglePop={addTogglePop} />
            )}
            {updateToggle && (
                <UpdateCategory provider={provider} contract={contract} data={data} showAlert={showAlert} updateTogglePop={updateTogglePop} />
            )}
        </div>
    )
}

export default CategorySection
