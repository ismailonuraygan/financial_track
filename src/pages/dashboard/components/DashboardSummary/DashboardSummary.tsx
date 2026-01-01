import { useQuery } from '@tanstack/react-query';
import { SummaryCard } from '@/components/cards';
import { ErrorState } from '@/components/ui';
import { financialService } from '@/api';
import TotalBalanceIcon from '@/assets/icons/total_balance.svg?react';
import TransactionsIcon from '@/assets/icons/transactions.svg?react';
import WalletAddIcon from '@/assets/icons/wallet-add.svg?react';
import './DashboardSummary.scss';

function DashboardSummary() {
	const {
		data: summary,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['financial-summary'],
		queryFn: financialService.getSummary,
	});

	if (isLoading) {
		return (
			<div className="dashboard-summary dashboard-summary--loading">
				<div className="dashboard-summary__skeleton" />
				<div className="dashboard-summary__skeleton" />
				<div className="dashboard-summary__skeleton" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="dashboard-summary">
				<ErrorState message="Failed to load summary" onRetry={() => refetch()} fullWidth />
			</div>
		);
	}

	return (
		<div className="dashboard-summary">
			<SummaryCard
				icon={<TotalBalanceIcon />}
				title="Total balance"
				amount={summary?.totalBalance.amount ?? 0}
				currency={summary?.totalBalance.currency}
				variant="primary"
			/>
			<SummaryCard
				icon={<TransactionsIcon />}
				title="Total spending"
				amount={summary?.totalExpense.amount ?? 0}
				currency={summary?.totalExpense.currency}
			/>
			<SummaryCard
				icon={<WalletAddIcon />}
				title="Total saved"
				amount={summary?.totalSavings.amount ?? 0}
				currency={summary?.totalSavings.currency}
			/>
		</div>
	);
}

export default DashboardSummary;
