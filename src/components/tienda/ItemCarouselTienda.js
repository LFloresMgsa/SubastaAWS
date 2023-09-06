import React from 'react';
import Slider from 'infinite-react-carousel';

import '../../css/SliderTienda.css';

const ItemCarousel = ({ images }) => {
	return (
		<section className='slider'>
			
			
			<Slider className='slider__content'>
				{images.map((image) => (
					<div key={image.Cab_cCatalogo} >
						<img src={image.Cab_cEnlace} alt={image.Cab_cCatalogo} />
						{/* <p className='slider-description'>{image.title}</p> */}
					</div>
				))}
			</Slider>
		</section>
	)
}

export default ItemCarousel
