import { Outlet } from 'react-router-dom';
import './AuthLayout.scss';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__form-section">
        <Outlet />
      </div>
      <div className="auth-layout__image-section">
        {/* Sağ taraftaki görsel alanı */}
      </div>
    </div>
  );
};

export default AuthLayout;

