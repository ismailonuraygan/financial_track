import {
	DashboardSummary,
	RecentTransactions,
	WorkingCapital,
	ScheduledTransfers,
} from './components';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<div className="dashboard">
			{/* Left side - main content */}
			<div className="dashboard__main">
				<DashboardSummary />
				<WorkingCapital />
				<RecentTransactions />
			</div>

			{/* Right side - sidebar */}
			<aside className="dashboard__sidebar">
				<ScheduledTransfers />
			</aside>
		</div>
	);
};

export default Dashboard;
