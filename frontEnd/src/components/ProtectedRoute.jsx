// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// // Importar la librería prop-types para validar las propiedades del componente
// import PropTypes from 'prop-types';

// // Si el usuario no está logueado, el componente redirige al usuario a la página de login.
// export const ProtectedRoute = ({ children }) => {
// 	// Obtener el estado de autenticación del usuario desde el store de Redux
// 	const { isLoggedIn } = useSelector((state) => state.auth);

// 	// Si el usuario está logueado, se retorna el contenido protegido
// 	if (isLoggedIn) {
// 		return children;
// 	}

// 	// Si el usuario no está logueado, se redirige a la página de login
// 	return <Navigate to='/login' />;
// };

// // Definir las validaciones para las propiedades del componente.
// // En este caso, estamos especificando que "children" es una prop obligatoria.
// ProtectedRoute.propTypes = {
// 	children: PropTypes.node.isRequired,
// };
