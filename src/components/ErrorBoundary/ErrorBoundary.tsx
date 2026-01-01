import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button, Flex, Text, Box } from '@radix-ui/themes';
import './ErrorBoundary.scss';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to console in development
		console.error('Error caught by ErrorBoundary:', error, errorInfo);

		// Here you could send the error to an error reporting service
		// logErrorToService(error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	handleReload = () => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="error-boundary">
					<Box className="error-boundary__container">
						<div className="error-boundary__icon">⚠️</div>
						<Text size="6" weight="bold" className="error-boundary__title">
							Oops! Something went wrong
						</Text>
						<Text as="p" size="3" color="gray" className="error-boundary__message">
							We're sorry, but something unexpected happened. Please try again.
						</Text>

						{import.meta.env.DEV && this.state.error && (
							<Box className="error-boundary__details">
								<Text as="p" size="2" weight="medium">
									Error Details:
								</Text>
								<code className="error-boundary__code">
									{this.state.error.message}
								</code>
							</Box>
						)}

						<Flex gap="3" mt="5" justify="center">
							<Button variant="outline" size="3" onClick={this.handleReset}>
								Try Again
							</Button>
							<Button size="3" onClick={this.handleReload}>
								Reload Page
							</Button>
						</Flex>
					</Box>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
