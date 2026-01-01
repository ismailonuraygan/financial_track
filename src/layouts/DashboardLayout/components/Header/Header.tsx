import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
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

			<div className="header__content">Header</div>
		</header>
	);
}

export default Header;
