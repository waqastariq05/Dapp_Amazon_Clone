import React from 'react'  //rfce

function Alert(props) {

    const capitalize = (word) => {
        let updateWord = word.charAt(0).toUpperCase() + word.slice(1)
        return updateWord
    }

    return (
        <>
            <div>
                {props.alert && <div className={`alert alert-${props.alert.type} py-3 rounded-0`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
                </div>}
            </div>
        </>
    )
}

export default Alert
