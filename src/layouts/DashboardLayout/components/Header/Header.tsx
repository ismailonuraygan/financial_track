import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import SearchIcon from '@/assets/icons/search.svg?react';
import BellIcon from '@/assets/icons/bell.svg?react';
import UserDropdown from './UserDropdown';
import './Header.scss';

interface HeaderProps {
	onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
	return (
		<header className="header">
			<div className="header__menu-btn">
				<IconButton variant="ghost" size="3" onClick={onMenuClick} aria-label="Open menu">
					<HamburgerMenuIcon width={24} height={24} />
				</IconButton>
			</div>

			<div className="header__content">
				<h1 className="header__title">Dashboard</h1>

				<div className="header__mobile-user">
					<UserDropdown isMobile />
				</div>

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

					<UserDropdown />
				</div>
			</div>
		</header>
	);
}

export default Header;
