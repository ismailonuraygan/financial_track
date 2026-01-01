import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Text, TextField, Flex, Box, IconButton } from '@radix-ui/themes';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authService } from '../../api';
import { showToast } from '@/utils';
import type { ApiError } from '@/api/types';
import './SignIn.scss';

const signInSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const loginMutation = useMutation({
		mutationFn: authService.login,
		onSuccess: () => {
			showToast.success('Welcome back!');
			navigate('/dashboard');
		},
		onError: (error: AxiosError<ApiError>) => {
			const message = error.response?.data?.message || 'Login failed. Please try again.';
			showToast.error(message);
		},
	});

	const onSubmit = (data: SignInFormData) => {
		loginMutation.mutate(data);
	};

	return (
		<div className="sign-in">
			<div className="sign-in__logo">
				<img src="/sidemenu_logo.png" alt="Fintech Logo" />
			</div>

			<div className="sign-in__content">
				<div className="sign-in__header">
					<h1 className="sign-in__title">Sign In</h1>
					<p className="sign-in__subtitle">Welcome back! Please enter your details</p>
				</div>

				<form className="sign-in__form" onSubmit={handleSubmit(onSubmit)}>
					<Flex direction="column" gap="4">
						<Box>
							<Text
								as="label"
								size="2"
								weight="medium"
								mb="1"
								className="sign-in__label"
							>
								Email
							</Text>
							<TextField.Root
								size="3"
								placeholder="example@gmail.com"
								type="email"
								{...register('email')}
								disabled={loginMutation.isPending}
							/>
							{errors.email && (
								<Text size="1" color="red" mt="1">
									{errors.email.message}
								</Text>
							)}
						</Box>

						<Box>
							<Text as="label" size="2" weight="medium" mb="1">
								Password
							</Text>
							<TextField.Root
								size="3"
								placeholder="••••••••"
								type={showPassword ? 'text' : 'password'}
								{...register('password')}
								disabled={loginMutation.isPending}
							>
								<TextField.Slot side="right">
									<IconButton
										type="button"
										size="1"
										variant="ghost"
										onClick={() => setShowPassword(!showPassword)}
										tabIndex={-1}
									>
										{showPassword ? (
											<EyeClosedIcon width="16" height="16" />
										) : (
											<EyeOpenIcon width="16" height="16" />
										)}
									</IconButton>
								</TextField.Slot>
							</TextField.Root>
							{errors.password && (
								<Text size="1" color="red" mt="1">
									{errors.password.message}
								</Text>
							)}
						</Box>

						<Button
							type="submit"
							size="3"
							className="sign-in__submit-btn"
							disabled={loginMutation.isPending}
						>
							{loginMutation.isPending ? 'Signing in...' : 'Sign In'}
						</Button>

						<Button
							type="button"
							variant="outline"
							size="3"
							className="sign-in__google-btn"
						>
							<img src="/google-icon.svg" alt="Google" width={20} height={20} />
							Sign in with google
						</Button>
					</Flex>
				</form>

				<div className="sign-in__footer">
					<Text size="2" color="gray">
						Don't have an account?{' '}
						<Link to="/sign-up" className="sign-in__link">
							Sign up
						</Link>
					</Text>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
