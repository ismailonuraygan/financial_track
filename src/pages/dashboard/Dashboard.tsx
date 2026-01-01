import { ComponentErrorBoundary } from '@/components/ErrorBoundary';
import {
	DashboardSummary,
	RecentTransactions,
	WorkingCapital,
	ScheduledTransfers,
	Wallet,
} from './components';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<div className="dashboard">
			<div className="dashboard__main">
				<ComponentErrorBoundary fallbackMessage="Failed to load summary">
					<DashboardSummary />
				</ComponentErrorBoundary>

				<ComponentErrorBoundary fallbackMessage="Failed to load chart">
					<WorkingCapital />
				</ComponentErrorBoundary>

				<ComponentErrorBoundary fallbackMessage="Failed to load transactions">
					<RecentTransactions />
				</ComponentErrorBoundary>
			</div>

			<aside className="dashboard__sidebar">
				<ComponentErrorBoundary fallbackMessage="Failed to load wallet">
					<Wallet />
				</ComponentErrorBoundary>

				<ComponentErrorBoundary fallbackMessage="Failed to load transfers">
					<ScheduledTransfers />
				</ComponentErrorBoundary>
			</aside>
		</div>
	);
};

export default Dashboard;
