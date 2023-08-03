import React from 'react'
import solidStar from '../../assets/star-solid.svg'
import regularStar from '../../assets/star-regular.svg'
import '../Card/Card.css'
import { ethers } from 'ethers';

const Card = (props) => {
    const { img, title, price, rating } = props;
    const cost = ethers.formatEther(price);

    return (
        <>
            <div class="card">
                <img src={`https://gateway.pinata.cloud/ipfs/${img}`} class="card-img-top" alt="product" />
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <div className='star'>
                        <img src={rating >= 1 ? solidStar : regularStar} class="img-fluid" alt="star" />
                        <img src={rating >= 2 ? solidStar : regularStar} class="img-fluid" alt="star" />
                        <img src={rating >= 3 ? solidStar : regularStar} class="img-fluid" alt="star" />
                        <img src={rating >= 4 ? solidStar : regularStar} class="img-fluid" alt="star" />
                        <img src={rating >= 5 ? solidStar : regularStar} class="img-fluid" alt="star" />
                    </div>
                    <p>{cost} ETH</p>
                </div>
            </div>
        </>
    )
}

export default Card
