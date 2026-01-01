// Auth Types
export interface RegisterRequest {
	fullName: string;
	email: string;
	password: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: User;
}

export interface User {
	id: string;
	fullName: string;
	email: string;
	avatar?: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface RefreshTokenResponse {
	accessToken: string;
}

// Financial Types
export interface SummaryItemChange {
	percentage: number;
	trend: 'up' | 'down';
}

export interface SummaryItem {
	amount: number;
	currency: string;
	change: SummaryItemChange;
}

export interface FinancialSummary {
	totalBalance: SummaryItem;
	totalExpense: SummaryItem;
	totalSavings: SummaryItem;
	lastUpdated: string;
}

export interface WorkingCapitalData {
	month: string;
	income: number;
	expense: number;
	net: number;
}

export interface WorkingCapitalSummary {
	totalIncome: number;
	totalExpense: number;
	netBalance: number;
}

export interface WorkingCapitalResponse {
	period: string;
	currency: string;
	data: WorkingCapitalData[];
	summary: WorkingCapitalSummary;
}

export interface WalletCard {
	id: string;
	name: string;
	type: 'credit' | 'debit';
	cardNumber: string;
	bank: string;
	network: 'Visa' | 'Mastercard' | 'Amex';
	expiryMonth: number;
	expiryYear: number;
	color: string;
	isDefault: boolean;
}

export interface WalletCardsResponse {
	cards: WalletCard[];
}

export interface Transaction {
	id: string;
	name: string;
	business: string;
	image?: string;
	type: string;
	amount: number;
	currency: string;
	date: string;
	status: 'completed' | 'pending' | 'failed';
}

export interface TransactionsSummary {
	totalIncome: number;
	totalExpense: number;
	count: number;
}

export interface RecentTransactionsResponse {
	transactions: Transaction[];
	summary: TransactionsSummary;
}

export interface ScheduledTransfer {
	id: string;
	name: string;
	image?: string;
	amount: number;
	currency: string;
	date: string;
	status: string;
}

export interface ScheduledTransfersSummary {
	totalScheduledAmount: number;
	count: number;
}

export interface ScheduledTransfersResponse {
	transfers: ScheduledTransfer[];
	summary: ScheduledTransfersSummary;
}

// API Response wrapper
export interface ApiResponse<T> {
	data: T;
	message?: string;
	success: boolean;
}

// API Error
export interface ApiError {
	message: string;
	statusCode: number;
	error?: string;
}
