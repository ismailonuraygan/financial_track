import { Outlet } from 'react-router-dom';
import './DashboardLayout.scss';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-layout__sidebar">
        {/* Sidebar */}
      </aside>
      <div className="dashboard-layout__main">
        <header className="dashboard-layout__header">
          {/* Header */}
        </header>
        <main className="dashboard-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

