import { useQuery } from '@tanstack/react-query';
import { financialService } from '@/api';
import { Flex, Text, IconButton, Box } from '@radix-ui/themes';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import WalletCard from './WalletCard';
import './Wallet.scss';

const Wallet = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['walletCards'],
		queryFn: financialService.getWallets,
	});

	if (isError) {
		return <div className="wallet">Error loading wallet cards.</div>;
	}

	const cards = data?.cards || [];

	return (
		<div className="wallet">
			<Flex justify="between" align="center" mb="4">
				<Text as="span" size="4" weight="bold" className="wallet__title">
					Wallet
				</Text>
				<IconButton variant="ghost" size="2" className="wallet__menu-btn">
					<DotsHorizontalIcon width={20} height={20} />
				</IconButton>
			</Flex>

			<div className="wallet__cards">
				{isLoading ? (
					<>
						<Box className="wallet__card-skeleton wallet__card-skeleton--back" />
						<Box className="wallet__card-skeleton wallet__card-skeleton--front" />
					</>
				) : (
					cards.map((card, index) => (
						<WalletCard
							key={card.id}
							card={card}
							position={index === 0 ? 'front' : 'back'}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Wallet;
