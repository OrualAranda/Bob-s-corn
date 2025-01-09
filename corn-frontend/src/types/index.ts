export interface PurchaseResponse {
  success: boolean;
  message: string; 
  purchase?: {
    id: number;
    clientId: string;
    purchaseTime: string;
    success: boolean;
  };
}

export interface PurchaseHistory {
  success: boolean;
  message: string; 
  totalPurchases?: number; 
  purchases?: Array<{
    id: number;
    clientId: string;
    purchaseTime: string;
    success: boolean;
  }>;
}

