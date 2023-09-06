import React from 'react';
import Slider from 'infinite-react-carousel';

import '../../css/SliderSubasta.css';

import img1020 from '../../assets/ejemplares/1020.jpg'
import img1032 from '../../assets/ejemplares/1032.jpg'
import img1054 from '../../assets/ejemplares/1054.jpg'
import img1056 from '../../assets/ejemplares/1056.jpg'
import img7302 from '../../assets/ejemplares/7302.jpg'
import img7399 from '../../assets/ejemplares/7399.jpg'
import img7610 from '../../assets/ejemplares/7610.jpg'
import img7656 from '../../assets/ejemplares/7656.jpg'
import img7664 from '../../assets/ejemplares/7664.jpg'
import img7680 from '../../assets/ejemplares/7680.jpg'
import img7699 from '../../assets/ejemplares/7699.jpg'
import img7796 from '../../assets/ejemplares/7796.jpg'
import img7799 from '../../assets/ejemplares/7799.jpg'
import img7821 from '../../assets/ejemplares/7821.jpg'
import img7874 from '../../assets/ejemplares/7874.jpg'
import img7905 from '../../assets/ejemplares/7905.jpg'
import img7906 from '../../assets/ejemplares/7906.jpg'
import img7908 from '../../assets/ejemplares/7908.jpg'
import img7935 from '../../assets/ejemplares/7935.jpg'
import img7936 from '../../assets/ejemplares/7936.jpg'
import img7945 from '../../assets/ejemplares/7945.jpg'
import img7946 from '../../assets/ejemplares/7946.jpg'
import img7961 from '../../assets/ejemplares/7961.jpg'
import img8038 from '../../assets/ejemplares/8038.jpg'
import img8039 from '../../assets/ejemplares/8039.jpg'
import img8053 from '../../assets/ejemplares/8053.jpg'
import img8057 from '../../assets/ejemplares/8057.jpg'
import img8075 from '../../assets/ejemplares/8075.jpg'
import img8128 from '../../assets/ejemplares/8128.jpg'
import img8163 from '../../assets/ejemplares/8163.jpg'

const ItemCarousel = ({ images }) => {
	console.log(images);
	return (
		<section >
			
			
					<div key={images.Cab_cCatalogo} >
						<img src={`../../../../${images.cab_cenlace}`} 
						alt={images.Cab_cCatalogo} />
						{/* <p className='slider-description'>PLACA: {images.Placa}</p>  */}
					</div>

			


			{/* <Slider className='slider__content'>
				{images.map((image) => (
					<div key={image.Cab_cCatalogo} >
						<img src={`../../../${image.cab_cenlace}`} 
						alt={image.Cab_cCatalogo} />
						
					</div>
				))}
			</Slider> */}
		</section>
	)
}

export default ItemCarousel
