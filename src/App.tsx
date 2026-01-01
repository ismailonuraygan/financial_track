import { RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from './providers/QueryProvider';
import AuthInitializer from './providers/AuthInitializer';
import ErrorBoundary from './components/ErrorBoundary';
import { router } from './router';

import '@radix-ui/themes/styles.css';
import './App.scss';

function App() {
	return (
		<ErrorBoundary>
			<QueryProvider>
				<Theme accentColor="lime" grayColor="slate" radius="medium" scaling="100%">
					<AuthInitializer>
						<RouterProvider router={router} />
					</AuthInitializer>
					<Toaster
						position="top-right"
						toastOptions={{
							duration: 4000,
							style: {
								fontFamily: 'Kumbh Sans, sans-serif',
								fontSize: '14px',
							},
							success: {
								iconTheme: {
									primary: '#C8EE44',
									secondary: '#1a1a2e',
								},
							},
							error: {
								iconTheme: {
									primary: '#EF4444',
									secondary: '#fff',
								},
							},
						}}
					/>
				</Theme>
			</QueryProvider>
		</ErrorBoundary>
	);
}

export default App;
