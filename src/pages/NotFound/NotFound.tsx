import { Link } from 'react-router-dom';
import { Button, Text, Flex, Box } from '@radix-ui/themes';
import './NotFound.scss';

const NotFound = () => {
	return (
		<div className="not-found">
			<Box className="not-found__container">
				<Text size="9" weight="bold" className="not-found__code">
					404
				</Text>
				<Text size="5" weight="bold" className="not-found__title">
					Page Not Found
				</Text>
				<Text as="p" size="3" className="not-found__message">
					The page you're looking for doesn't exist or has been moved.
				</Text>
				<Flex gap="3" mt="5">
					<Button size="3" asChild>
						<Link to="/dashboard">Go to Dashboard</Link>
					</Button>
					<Button size="3" variant="outline" asChild>
						<Link to="/sign-in">Go to Sign In</Link>
					</Button>
				</Flex>
			</Box>
		</div>
	);
};

export default NotFound;
