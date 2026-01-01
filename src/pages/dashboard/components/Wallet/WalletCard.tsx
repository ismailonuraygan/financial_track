import type { WalletCard as WalletCardType } from '@/api/types';
import ChipIcon from '@/assets/icons/chip.svg?react';
import ContactlessIcon from '@/assets/icons/contactless.svg?react';
import VisaLogo from '@/assets/icons/visa.svg?react';
import MastercardLogo from '@/assets/icons/mastercard.png';
import './WalletCard.scss';

interface WalletCardProps {
	card: WalletCardType;
	position: 'front' | 'back';
}

const WalletCard = ({ card, position }: WalletCardProps) => {
	const formatExpiry = () => {
		const month = card.expiryMonth.toString().padStart(2, '0');
		const year = card.expiryYear.toString().slice(-2);
		return `${month}/${year}`;
	};

	const maskCardNumber = (number: string) => {
		// Show last 4 digits, mask the rest
		const parts = number.split(' ');
		if (parts.length === 4) {
			return `${parts[0].replace(/\d/g, '*')}${parts[1].replace(/\d/g, '*')}${parts[2]}****`;
		}
		return number;
	};

	// Determine text color based on background darkness
	const getContrastColor = (hexColor: string) => {
		const hex = hexColor.replace('#', '');
		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.5 ? '#1a1a2e' : '#ffffff';
	};

	const textColor = getContrastColor(card.color);

	return (
		<div
			className={`wallet-card wallet-card--${position}`}
			style={{
				backgroundColor: card.color,
				color: textColor,
			}}
		>
			{/* Top row - Bank name */}
			<div className="wallet-card__header">
				<span className="wallet-card__bank">{card.bank}</span>
				{position === 'back' && <ContactlessIcon className="wallet-card__contactless" />}
			</div>

			{/* Chip */}
			<div className="wallet-card__chip">
				<ChipIcon />
			</div>

			{/* Card number */}
			<div className="wallet-card__number">
				{position === 'front' ? card.cardNumber : maskCardNumber(card.cardNumber)}
			</div>

			{/* Bottom row - Expiry & Network */}
			<div className="wallet-card__footer">
				<div className="wallet-card__expiry">
					<span className="wallet-card__expiry-label">VALID THRU</span>
					<span className="wallet-card__expiry-value">{formatExpiry()}</span>
				</div>
				<div className="wallet-card__network">
					{card.network === 'Visa' ? (
						<VisaLogo className="wallet-card__network-logo" />
					) : (
						<img
							src={MastercardLogo}
							alt="Mastercard"
							className="wallet-card__network-logo wallet-card__network-logo--mastercard"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default WalletCard;
