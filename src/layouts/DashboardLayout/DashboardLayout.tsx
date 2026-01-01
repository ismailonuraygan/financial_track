import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import './DashboardLayout.scss';

const DashboardLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleMenuClick = () => {
		setIsSidebarOpen(true);
	};

	const handleSidebarClose = () => {
		setIsSidebarOpen(false);
	};

	return (
		<div className="dashboard-layout">
			<Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
			<div className="dashboard-layout__main">
				<Header onMenuClick={handleMenuClick} />
				<main className="dashboard-layout__content">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
