import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Avatar, DropdownMenu, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';

interface UserDropdownProps {
	isMobile?: boolean;
}

const UserDropdown = ({ isMobile = false }: UserDropdownProps) => {
	const navigate = useNavigate();
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
		navigate('/sign-in');
	};

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<button
					className={`header__user-btn ${isMobile ? 'header__user-btn--mobile' : ''}`}
					type="button"
				>
					<Avatar
						src={user?.avatar}
						fallback={user?.fullName?.charAt(0).toUpperCase() || 'U'}
						size="2"
						radius="full"
						className="header__avatar"
					/>
					{!isMobile && (
						<>
							<Text size="2" weight="medium" className="header__user-name">
								{user?.fullName || 'User'}
							</Text>
							<ChevronDownIcon width={16} height={16} />
						</>
					)}
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" className="header__dropdown">
				<DropdownMenu.Item onClick={handleLogout} style={{ cursor: 'pointer' }}>
					Logout
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

export default UserDropdown;

