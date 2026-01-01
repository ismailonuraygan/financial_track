import { useQuery } from '@tanstack/react-query';
import { financialService } from '@/api';
import { ErrorState } from '@/components/ui';
import './RecentTransactions.scss';

function RecentTransactions() {
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ['recent-transactions'],
		queryFn: financialService.getRecentTransactions,
	});

	const formatAmount = (amount: number, currency: string) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 2,
		}).format(Math.abs(amount));
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});
	};

	if (isLoading) {
		return (
			<div className="recent-transactions recent-transactions--loading">
				<div className="recent-transactions__header">
					<div className="recent-transactions__skeleton-title" />
				</div>
				<div className="recent-transactions__skeleton-row" />
				<div className="recent-transactions__skeleton-row" />
				<div className="recent-transactions__skeleton-row" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="recent-transactions">
				<ErrorState message="Failed to load transactions" onRetry={() => refetch()} />
			</div>
		);
	}

	return (
		<div className="recent-transactions">
			<div className="recent-transactions__header">
				<h2 className="recent-transactions__title">Recent Transaction</h2>
				<button type="button" className="recent-transactions__view-all">
					View All &gt;
				</button>
			</div>

			<div className="recent-transactions__table-wrapper">
				<table className="recent-transactions__table">
					<thead>
						<tr>
							<th>NAME/BUSINESS</th>
							<th>TYPE</th>
							<th>AMOUNT</th>
							<th>DATE</th>
						</tr>
					</thead>
					<tbody>
						{data?.transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>
									<div className="recent-transactions__name-cell">
										{transaction.image && (
											<img
												src={transaction.image}
												alt={transaction.name}
												className="recent-transactions__logo"
											/>
										)}
										<div className="recent-transactions__name-info">
											<span className="recent-transactions__name">
												{transaction.name}
											</span>
											<span className="recent-transactions__business">
												{transaction.business}
											</span>
										</div>
									</div>
								</td>
								<td className="recent-transactions__type">{transaction.type}</td>
								<td className="recent-transactions__amount">
									{formatAmount(transaction.amount, transaction.currency)}
								</td>
								<td className="recent-transactions__date">
									{formatDate(transaction.date)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default RecentTransactions;
