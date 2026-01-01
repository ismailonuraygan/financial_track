import { Outlet } from 'react-router-dom';
import './AuthLayout.scss';

const AuthLayout = () => {
	return (
		<div className="auth-layout">
			<div className="auth-layout__form-section">
				<Outlet />
			</div>
			<div className="auth-layout__image-section">
				<img
					src="/auth_page_image.jpg"
					alt="Financial tracking illustration"
					className="auth-layout__image"
				/>
			</div>
		</div>
	);
};

export default AuthLayout;
