import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../store';

// Icons
import DashboardIcon from '../../../../assets/icons/dashboard.svg?react';
import TransactionsIcon from '../../../../assets/icons/transactions.svg?react';
import InvoicesIcon from '../../../../assets/icons/invoices.svg?react';
import MyWalletsIcon from '../../../../assets/icons/my_wallets.svg?react';
import SettingsIcon from '../../../../assets/icons/settings.svg?react';
import HelpIcon from '../../../../assets/icons/help.svg?react';
import LogoutIcon from '../../../../assets/icons/logout.svg?react';

import './Sidebar.scss';

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const mainNavItems = [
	{ path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
	{ path: '/dashboard', label: 'Transactions', icon: <TransactionsIcon /> },
	{ path: '/dashboard', label: 'Invoices', icon: <InvoicesIcon /> },
	{ path: '/dashboard', label: 'My Wallets', icon: <MyWalletsIcon /> },
	{ path: '/dashboard', label: 'Settings', icon: <SettingsIcon /> },
];

const bottomNavItems = [{ path: '/help', label: 'Help', icon: <HelpIcon /> }];

function Sidebar({ isOpen, onClose }: SidebarProps) {
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);

	// Close sidebar on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			// Prevent body scroll when sidebar is open on mobile
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose]);

	const handleLogout = () => {
		logout();
		navigate('/sign-in');
	};

	return (
		<>
			{/* Overlay for mobile */}
			<div
				className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`}
				onClick={onClose}
				aria-hidden="true"
			/>

			<aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
				{/* Logo */}
				<div className="sidebar__logo">
					<img src="/sidemenu_logo.png" alt="Fintech" />
				</div>

				{/* Main Navigation */}
				<nav className="sidebar__nav">
					<ul className="sidebar__nav-list">
						{mainNavItems.map((item) => (
							<li key={item.path}>
								<NavLink
									to={item.path}
									className={({ isActive }) =>
										`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
									}
									onClick={onClose}
								>
									<span className="sidebar__nav-icon">{item.icon}</span>
									<span className="sidebar__nav-label">{item.label}</span>
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				{/* Bottom Navigation */}
				<div className="sidebar__bottom">
					<ul className="sidebar__nav-list">
						{bottomNavItems.map((item) => (
							<li key={item.path}>
								<NavLink
									to={item.path}
									className={({ isActive }) =>
										`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
									}
									onClick={onClose}
								>
									<span className="sidebar__nav-icon">{item.icon}</span>
									<span className="sidebar__nav-label">{item.label}</span>
								</NavLink>
							</li>
						))}
						<li>
							<button
								type="button"
								className="sidebar__nav-item sidebar__logout-btn"
								onClick={handleLogout}
							>
								<span className="sidebar__nav-icon">
									<LogoutIcon />
								</span>
								<span className="sidebar__nav-label">Logout</span>
							</button>
						</li>
					</ul>
				</div>
			</aside>
		</>
	);
}

export default Sidebar;
