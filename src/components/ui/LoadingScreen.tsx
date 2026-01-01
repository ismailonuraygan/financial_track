import './LoadingScreen.scss';

const LoadingScreen = () => {
	return (
		<div className="loading-screen">
			<div className="loading-screen__spinner" />
			<p className="loading-screen__text">Loading...</p>
		</div>
	);
};

export default LoadingScreen;
