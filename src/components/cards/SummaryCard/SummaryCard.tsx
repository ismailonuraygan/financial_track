import { useState, useEffect, type ReactNode } from 'react';
import NumberFlow from '@number-flow/react';
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
	const [displayAmount, setDisplayAmount] = useState(0);

	// Start with 0, then animate to actual amount
	useEffect(() => {
		// Small delay to ensure NumberFlow can detect the change
		const timer = setTimeout(() => {
			setDisplayAmount(amount);
		}, 50);
		return () => clearTimeout(timer);
	}, [amount]);

	return (
		<div className={`summary-card summary-card--${variant}`}>
			<div className="summary-card__icon">{icon}</div>
			<div className="summary-card__content">
				<span className="summary-card__title">{title}</span>
				<span className="summary-card__amount">
					<NumberFlow
						value={displayAmount}
						format={{
							style: 'currency',
							currency: currency,
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}}
						transformTiming={{ duration: 1500, easing: 'ease-out' }}
					/>
				</span>
			</div>
		</div>
	);
}

export default SummaryCard;
