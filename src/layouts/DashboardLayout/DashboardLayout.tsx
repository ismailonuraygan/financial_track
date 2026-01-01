import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, Spinner, Text } from '@radix-ui/themes';
import { useAuthStore } from '@/store';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import './DashboardLayout.scss';

const DashboardLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const isLoggingOut = useAuthStore((state) => state.isLoggingOut);

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

			{/* Logout Overlay */}
			{isLoggingOut && (
				<div className="dashboard-layout__logout-overlay">
					<Flex direction="column" align="center" gap="4">
						<Spinner size="3" />
						<Text size="3" weight="medium">
							Logging out...
						</Text>
					</Flex>
				</div>
			)}
		</div>
	);
};

export default DashboardLayout;
