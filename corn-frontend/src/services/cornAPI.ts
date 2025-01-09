import { PurchaseHistory, PurchaseResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const cornAPI = {
  purchaseCorn: async (): Promise<PurchaseResponse> => {
    const response = await fetch(`${API_URL}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Error when making the purchase',
      };
    }

    const responseData = await response.json();

    if (responseData.success) {
      return responseData; 
    } else {
      return {
        success: false,
        message: responseData.message || 'Unknown error',
      };
    }
  },

  getPurchaseHistory: async (): Promise<PurchaseHistory> => {
    const response = await fetch(`${API_URL}/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Error getting history',
      };
    }

    return response.json();
  }
};
