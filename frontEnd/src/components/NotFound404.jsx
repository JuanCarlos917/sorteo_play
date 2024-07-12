import { Link } from 'react-router-dom';
import { Result } from 'antd';
import { Button } from '@nextui-org/react';

const NotFound404 = () => {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='flex flex-col items-center justify-center px-4 md:px-0'>
				<Result
					status='404'
					title='404'
					subTitle='¡Ups! Parece que esta página ha decidido tomarse unas vacaciones. ¿La ayudamos a regresar?'
					extra={
						<div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
							<Link to='/'>
								<Button
									className='text-base md:text-lg font-rubik text-dark_grayish_blue'
									color='warning'
									variant='ghost'>
									Regresar al Inicio
								</Button>
							</Link>
						</div>
					}
				/>
			</div>
		</div>
	);
};

export default NotFound404;
