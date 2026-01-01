import { DashboardSummary, RecentTransactions, WorkingCapital } from './components';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<div className="dashboard">
			<DashboardSummary />
			<WorkingCapital />
			<RecentTransactions />
		</div>
	);
};

export default Dashboard;
