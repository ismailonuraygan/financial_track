import { useEffect } from 'react';
import './Sidebar.scss';

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
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

	return (
		<>
			{/* Overlay for mobile */}
			<div
				className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`}
				onClick={onClose}
				aria-hidden="true"
			/>

			<aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
				<div className="sidebar__content">Sidebar</div>
			</aside>
		</>
	);
}

export default Sidebar;
