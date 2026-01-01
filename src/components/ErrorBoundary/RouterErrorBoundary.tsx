import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Button, Flex, Text, Box } from '@radix-ui/themes';
import './ErrorBoundary.scss';

const RouterErrorBoundary = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	let errorMessage = 'An unexpected error occurred.';
	let errorDetails = '';

	if (isRouteErrorResponse(error)) {
		errorMessage = error.statusText || 'Page not found';
		errorDetails = `Status: ${error.status}`;
	} else if (error instanceof Error) {
		errorMessage = error.message;
		errorDetails = import.meta.env.DEV ? error.stack || '' : '';
	}

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleGoHome = () => {
		navigate('/dashboard');
	};

	const handleReload = () => {
		window.location.reload();
	};

	return (
		<div className="error-boundary">
			<Box className="error-boundary__container">
				<div className="error-boundary__icon">⚠️</div>
				<Text as="p" size="6" weight="bold" className="error-boundary__title">
					Oops! Something went wrong
				</Text>
				<Text as="p" size="3" color="gray" className="error-boundary__message">
					{errorMessage}
				</Text>

				{import.meta.env.DEV && errorDetails && (
					<Box className="error-boundary__details">
						<Text as="p" size="2" weight="medium">
							Error Details:
						</Text>
						<code className="error-boundary__code">{errorDetails}</code>
					</Box>
				)}

				<Flex gap="3" mt="5" justify="center" wrap="wrap">
					<Button variant="outline" size="3" onClick={handleGoBack}>
						Go Back
					</Button>
					<Button variant="outline" size="3" onClick={handleGoHome}>
						Go to Dashboard
					</Button>
					<Button size="3" onClick={handleReload}>
						Reload Page
					</Button>
				</Flex>
			</Box>
		</div>
	);
};

export default RouterErrorBoundary;
