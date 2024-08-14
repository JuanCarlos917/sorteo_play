import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
	const [hasError, setHasError] = useState(false);

	const urlLottier =
		'https://lottie.host/0453ab46-3f47-4b11-b6fb-681093028272/Z3GI6gQqgv.json';

	return (
		<div className='flex justify-center items-center h-full'>
			{hasError ? (
				<div className='text-red-500 text-lg font-semibold'>
					Not Found
				</div>
			) : (
				<DotLottieReact
					src={urlLottier}
					loop
					autoplay
					onError={() => setHasError(true)}
					className='w-full h-full'
				/>
			)}
		</div>
	);
};

export default Loading;
