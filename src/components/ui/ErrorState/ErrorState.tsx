import { Button, Text } from '@radix-ui/themes';
import { ReloadIcon } from '@radix-ui/react-icons';
import './ErrorState.scss';

interface ErrorStateProps {
	message?: string;
	onRetry?: () => void;
	fullWidth?: boolean;
}

const ErrorState = ({
	message = 'Something went wrong. Please try again.',
	onRetry,
	fullWidth = false,
}: ErrorStateProps) => {
	return (
		<div className={`error-state ${fullWidth ? 'error-state--full-width' : ''}`}>
			<div className="error-state__icon">⚠️</div>
			<Text as="p" size="3" className="error-state__message">
				{message}
			</Text>
			{onRetry && (
				<Button
					variant="outline"
					size="2"
					onClick={onRetry}
					className="error-state__retry-btn"
				>
					<ReloadIcon />
					Try Again
				</Button>
			)}
		</div>
	);
};

export default ErrorState;
