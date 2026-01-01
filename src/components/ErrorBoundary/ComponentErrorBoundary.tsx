import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorState } from '@/components/ui';

interface ComponentErrorBoundaryProps {
	children: ReactNode;
	fallbackMessage?: string;
}

interface ComponentErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

/**
 * Component-level Error Boundary for isolating errors within dashboard sections
 * Unlike the global ErrorBoundary, this shows an inline error state
 */
class ComponentErrorBoundary extends Component<
	ComponentErrorBoundaryProps,
	ComponentErrorBoundaryState
> {
	constructor(props: ComponentErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ComponentErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ComponentErrorBoundary caught an error:', error, errorInfo);
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<ErrorState
					message={this.props.fallbackMessage || 'Failed to load this section'}
					onRetry={this.handleRetry}
				/>
			);
		}

		return this.props.children;
	}
}

export default ComponentErrorBoundary;

