import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { financialService } from '@/api';
import './WorkingCapital.scss';

type Period = 'last7Days' | 'last30Days' | 'last6Months';

const periodOptions: { value: Period; label: string }[] = [
	{ value: 'last7Days', label: 'Last 7 days' },
	{ value: 'last30Days', label: 'Last 30 days' },
	{ value: 'last6Months', label: 'Last 6 months' },
];

function WorkingCapital() {
	const [period, setPeriod] = useState<Period>('last7Days');

	const { data, isLoading } = useQuery({
		queryKey: ['working-capital', period],
		queryFn: () => financialService.getWorkingCapital(period),
	});

	const formatYAxis = (value: number) => {
		if (value >= 1000) {
			return `${value / 1000}K`;
		}
		return value.toString();
	};

	const formatTooltip = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: data?.currency || 'USD',
			minimumFractionDigits: 0,
		}).format(value);
	};

	if (isLoading) {
		return (
			<div className="working-capital working-capital--loading">
				<div className="working-capital__header">
					<div className="working-capital__skeleton-title" />
				</div>
				<div className="working-capital__skeleton-chart" />
			</div>
		);
	}

	return (
		<div className="working-capital">
			<div className="working-capital__header">
				<h2 className="working-capital__title">Working Capital</h2>

				<div className="working-capital__controls">
					<div className="working-capital__legend">
						<span className="working-capital__legend-item working-capital__legend-item--income">
							<span className="working-capital__legend-dot" />
							Income
						</span>
						<span className="working-capital__legend-item working-capital__legend-item--expense">
							<span className="working-capital__legend-dot" />
							Expenses
						</span>
					</div>

					<select
						className="working-capital__period-select"
						value={period}
						onChange={(e) => setPeriod(e.target.value as Period)}
					>
						{periodOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="working-capital__chart">
				<ResponsiveContainer width="100%" height={300}>
					<LineChart
						data={data?.data || []}
						margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9ECEF" />
						<XAxis
							dataKey="month"
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#929EAE', fontSize: 12 }}
							dy={10}
						/>
						<YAxis
							tickFormatter={formatYAxis}
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#929EAE', fontSize: 12 }}
							dx={-10}
						/>
						<Tooltip
							formatter={(value) => [formatTooltip(Number(value)), '']}
							labelStyle={{ display: 'none' }}
							contentStyle={{
								backgroundColor: '#fff',
								border: '1px solid #E9ECEF',
								borderRadius: '8px',
								boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
							}}
						/>
						<Line
							type="monotone"
							dataKey="income"
							stroke="#29A073"
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 6, fill: '#363A3F', stroke: '#fff', strokeWidth: 2 }}
						/>
						<Line
							type="monotone"
							dataKey="expense"
							stroke="#C8EE44"
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 6, fill: '#363A3F', stroke: '#fff', strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default WorkingCapital;
