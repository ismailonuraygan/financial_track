import { useQuery } from '@tanstack/react-query';
import { financialService } from '@/api';
import { Flex, Box, Text, Button, Avatar } from '@radix-ui/themes';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ErrorState } from '@/components/ui';
import './ScheduledTransfers.scss';

const ScheduledTransfers = () => {
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ['scheduledTransfers'],
		queryFn: financialService.getScheduledTransfers,
	});

	if (isError) {
		return (
			<div className="scheduled-transfers">
				<Flex justify="between" align="center" mb="4">
					<Text as="span" size="4" weight="bold" className="scheduled-transfers__title">
						Scheduled Transfers
					</Text>
				</Flex>
				<ErrorState message="Failed to load transfers" onRetry={() => refetch()} />
			</div>
		);
	}

	const transfers = data?.transfers || [];

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	};

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
	};

	const formatAmount = (amount: number, currency: string) => {
		const absAmount = Math.abs(amount);
		const formattedAmount = absAmount.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
		return `- ${currency}${formattedAmount}`;
	};

	return (
		<div className="scheduled-transfers">
			<Flex justify="between" align="center" mb="4">
				<Text as="span" size="4" weight="bold" className="scheduled-transfers__title">
					Scheduled Transfers
				</Text>
				<Button variant="ghost" size="2" className="scheduled-transfers__view-all-btn">
					View All <ChevronRightIcon />
				</Button>
			</Flex>

			<div className="scheduled-transfers__list">
				{isLoading
					? Array.from({ length: 5 }).map((_, index) => (
							<div
								key={index}
								className="scheduled-transfers__item scheduled-transfers__item--loading"
							>
								<Flex align="center" gap="3">
									<Box className="scheduled-transfers__avatar-skeleton" />
									<Box>
										<Box className="scheduled-transfers__name-skeleton" />
										<Box className="scheduled-transfers__date-skeleton" />
									</Box>
								</Flex>
								<Box className="scheduled-transfers__amount-skeleton" />
							</div>
						))
					: transfers.map((transfer) => (
							<div key={transfer.id} className="scheduled-transfers__item">
								<Flex align="center" gap="3">
									<Avatar
										src={transfer.image}
										fallback={transfer.name.charAt(0).toUpperCase()}
										size="3"
										radius="full"
										className="scheduled-transfers__avatar"
									/>
									<Box>
										<Text
											as="div"
											size="2"
											weight="bold"
											className="scheduled-transfers__name"
										>
											{transfer.name}
										</Text>
										<Text
											as="div"
											size="1"
											className="scheduled-transfers__date"
										>
											{formatDate(transfer.date)} at{' '}
											{formatTime(transfer.date)}
										</Text>
									</Box>
								</Flex>
								<Text
									as="div"
									size="3"
									weight="bold"
									className="scheduled-transfers__amount"
								>
									{formatAmount(transfer.amount, transfer.currency)}
								</Text>
							</div>
						))}
			</div>
		</div>
	);
};

export default ScheduledTransfers;
