import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
	'https://res.cloudinary.com/dcqkvu95d/image/upload/v1721760497/PS5_DS5_t6hm0y.jpg',
	'https://res.cloudinary.com/dcqkvu95d/image/upload/v1721760709/PS5_Grey_Matt_Whitewood_-_designer___director__liccmy.jpg',
	'https://res.cloudinary.com/dcqkvu95d/image/upload/v1721760512/PS5_DS5_1_gajkz4.jpg',
	'https://res.cloudinary.com/dcqkvu95d/image/upload/v1721760022/__28_jldlha.jpg',
	'https://res.cloudinary.com/dcqkvu95d/image/upload/v1721760028/Dualsense_g0dwal.jpg',
];

const ImageCarousel = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
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
