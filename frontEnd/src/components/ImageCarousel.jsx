import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
	'https://res.cloudinary.com/dcqkvu95d/image/upload/v1730665469/Historia_de_Instagram_Rifa_de_Navidad_Ilustrado_Verde_1_qlg6jm.png',
	'https://res.cloudinary.com/dcqkvu95d/image/upload/v1730665386/Violet_and_White_Thank_You_500_Followers_Your_Story_Post_de_Instagram_wtn9sm.png',
];

const ImageCarousel = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
	};

	return (
		<div className='container mx-auto my-3'>
			<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index} className='px-4'>
						<img
							src={image}
							alt={`Slide ${index}`}
							className='w-full h-96 object-cover rounded-lg shadow-lg'
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default ImageCarousel;
