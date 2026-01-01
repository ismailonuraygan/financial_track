import type { ReactNode } from 'react';
import { formatCurrency } from '@/utils';
import './SummaryCard.scss';

interface SummaryCardProps {
	icon: ReactNode;
	title: string;
	amount: number;
	currency?: string;
	variant?: 'primary' | 'default';
}

function SummaryCard({
	icon,
	title,
	amount,
	currency = 'USD',
	variant = 'default',
}: SummaryCardProps) {
	return (
		<div className={`summary-card summary-card--${variant}`}>
			<div className="summary-card__icon">{icon}</div>
			<div className="summary-card__content">
				<span className="summary-card__title">{title}</span>
				<span className="summary-card__amount">{formatCurrency(amount, currency)}</span>
			</div>
		</div>
	);
}

export default SummaryCard;
