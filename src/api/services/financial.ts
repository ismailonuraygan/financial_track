import apiClient from '../client';
import type {
	FinancialSummary,
	WorkingCapitalResponse,
	WalletCardsResponse,
	RecentTransactionsResponse,
	ScheduledTransfersResponse,
	ApiResponse,
} from '../types';

export const financialService = {
	getSummary: async (): Promise<FinancialSummary> => {
		const response = await apiClient.get<ApiResponse<FinancialSummary>>('/financial/summary');
		return response.data.data;
	},

	getWorkingCapital: async (period?: string): Promise<WorkingCapitalResponse> => {
		const response = await apiClient.get<ApiResponse<WorkingCapitalResponse>>(
			'/financial/working-capital',
			{
				params: { period },
			}
		);
		return response.data.data;
	},

	getWallets: async (): Promise<WalletCardsResponse> => {
		const response = await apiClient.get<ApiResponse<WalletCardsResponse>>('/financial/wallet');
		return response.data.data;
	},

	getRecentTransactions: async (): Promise<RecentTransactionsResponse> => {
		const response = await apiClient.get<ApiResponse<RecentTransactionsResponse>>(
			'/financial/transactions/recent'
		);
		return response.data.data;
	},

	getScheduledTransfers: async (): Promise<ScheduledTransfersResponse> => {
		const response = await apiClient.get<ApiResponse<ScheduledTransfersResponse>>(
			'/financial/transfers/scheduled'
		);
		return response.data.data;
	},
};

export default financialService;
