import { HamburgerMenuIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { IconButton, Avatar, DropdownMenu, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import SearchIcon from '@/assets/icons/search.svg?react';
import BellIcon from '@/assets/icons/bell.svg?react';
import './Header.scss';

interface HeaderProps {
	onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
	const navigate = useNavigate();
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
		navigate('/sign-in');
	};

	return (
		<header className="header">
			<div className="header__menu-btn">
				<IconButton variant="ghost" size="3" onClick={onMenuClick} aria-label="Open menu">
					<HamburgerMenuIcon width={24} height={24} />
				</IconButton>
			</div>

			<div className="header__content">
				<h1 className="header__title">Dashboard</h1>

				<div className="header__actions">
					<IconButton
						variant="ghost"
						size="3"
						className="header__action-btn"
						aria-label="Search"
					>
						<SearchIcon />
					</IconButton>

					<IconButton
						variant="ghost"
						size="3"
						className="header__action-btn"
						aria-label="Notifications"
					>
						<BellIcon />
					</IconButton>

					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<button className="header__user-btn" type="button">
								<Avatar
									src={user?.avatar}
									fallback={user?.fullName?.charAt(0).toUpperCase() || 'U'}
									size="2"
									radius="full"
									className="header__avatar"
								/>
								<Text size="2" weight="medium" className="header__user-name">
									{user?.fullName || 'User'}
								</Text>
								<ChevronDownIcon width={16} height={16} />
							</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end" className="header__dropdown">
							<DropdownMenu.Item onClick={handleLogout} style={{ cursor: 'pointer' }}>
								Logout
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</header>
	);
}

export default Header;
