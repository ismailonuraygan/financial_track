import { DashboardSummary, RecentTransactions } from './components';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<div className="dashboard">
			<DashboardSummary />
			<RecentTransactions />
		</div>
	);
};

export default Dashboard;
