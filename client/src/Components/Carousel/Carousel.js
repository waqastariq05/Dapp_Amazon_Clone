import React from 'react'
import '../Carousel/Carousel.css'
import s1 from '../../assets/slider/s1.jpg'
import s2 from '../../assets/slider/s2.jpg'
import s3 from '../../assets/slider/s3.jpg'
import s4 from '../../assets/slider/s4.jpg'
import s5 from '../../assets/slider/s5.jpg'

const Carousel = () => {
    return (
        <>
            <div id="slider" class="carousel slide" data-bs-ride="true">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={s1} class="d-block w-100" alt="s1" />
                    </div>
                    <div class="carousel-item">
                        <img src={s2} class="d-block w-100" alt="s2" />
                    </div>
                    <div class="carousel-item">
                        <img src={s3} class="d-block w-100" alt="s3" />
                    </div>
                    <div class="carousel-item">
                        <img src={s4} class="d-block w-100" alt="s4" />
                    </div>
                    <div class="carousel-item">
                        <img src={s5} class="d-block w-100" alt="s5" />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carousel
