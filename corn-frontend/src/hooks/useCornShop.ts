'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cornAPI } from '@/services/cornAPI';
import { PurchaseHistory, PurchaseResponse } from '@/types';

export const useCornShop = () => {
  const queryClient = useQueryClient();

  const { data: history, isLoading: isLoadingHistory, error: historyError } = useQuery<PurchaseHistory>({
    queryKey: ['purchaseHistory'],
    queryFn: cornAPI.getPurchaseHistory,
  });

  const { mutateAsync: purchaseCorn, status: purchaseStatus, error: purchaseError } = useMutation<PurchaseResponse, Error>({
    mutationFn: cornAPI.purchaseCorn,
    onSuccess: (data) => {
      console.log("Successful purchase:", data);
      queryClient.invalidateQueries({ queryKey: ['purchaseHistory'] });
    },
    onError: (error: Error) => {
      console.error("Purchase error:", error.message || error);
    },
  });

  const isPurchasing = purchaseStatus === 'pending';

  return {
    history,
    isLoadingHistory,
    historyError,
    purchaseCorn,
    isPurchasing,
    purchaseError,
  };
};