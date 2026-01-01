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
import './SignUp.scss';

const signUpSchema = z.object({
	fullName: z
		.string()
		.min(1, 'Full name is required')
		.min(2, 'Name must be at least 2 characters'),
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one number'
		),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
	});

	const registerMutation = useMutation({
		mutationFn: authService.register,
		onSuccess: () => {
			showToast.success('Account created successfully!');
			navigate('/dashboard');
		},
		onError: (error: AxiosError<ApiError>) => {
			const message =
				error.response?.data?.message || 'Registration failed. Please try again.';
			showToast.error(message);
		},
	});

	const onSubmit = (data: SignUpFormData) => {
		registerMutation.mutate({
			fullName: data.fullName,
			email: data.email,
			password: data.password,
		});
	};

	return (
		<div className="sign-up">
			<div className="sign-up__logo">
				<img src="/sidemenu_logo.png" alt="Fintech Logo" />
			</div>

			<div className="sign-up__content">
				<div className="sign-up__header">
					<h1 className="sign-up__title">Create new account</h1>
					<p className="sign-up__subtitle">Welcome back! Please enter your details</p>
				</div>

				<form className="sign-up__form" onSubmit={handleSubmit(onSubmit)}>
					<Flex direction="column" gap="4">
						<Box>
							<Text as="label" size="2" weight="medium" mb="1">
								Full Name
							</Text>
							<TextField.Root
								size="3"
								placeholder="Mahfuzul Nabil"
								type="text"
								{...register('fullName')}
								disabled={registerMutation.isPending}
							/>
							{errors.fullName && (
								<Text size="1" color="red" mt="1">
									{errors.fullName.message}
								</Text>
							)}
						</Box>

						<Box>
							<Text as="label" size="2" weight="medium" mb="1">
								Email
							</Text>
							<TextField.Root
								size="3"
								placeholder="example@gmail.com"
								type="email"
								{...register('email')}
								disabled={registerMutation.isPending}
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
								disabled={registerMutation.isPending}
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
							className="sign-up__submit-btn"
							disabled={registerMutation.isPending}
							loading={registerMutation.isPending}
						>
							'Create Account'
						</Button>

						<Button
							type="button"
							variant="outline"
							size="3"
							className="sign-up__google-btn"
						>
							<img src="/google-icon.svg" alt="Google" width={20} height={20} />
							Sign up with google
						</Button>
					</Flex>
				</form>

				<div className="sign-up__footer">
					<Text size="2" color="gray">
						Already have an account?{' '}
						<Link to="/sign-in" className="sign-up__link">
							Sign in
						</Link>
					</Text>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
