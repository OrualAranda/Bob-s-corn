"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCornShop } from "@/hooks/useCornShop";

export const PurchaseHistorys = () => {
  const { history, isLoadingHistory, historyError } = useCornShop(); //? Usando el hook para obtener el historial y manejar estados

  //? Mostrar mensaje de carga si los datos están siendo recuperados
  if (isLoadingHistory) {
    return <p className="text-gray-500">Loading purchase history...</p>;
  }

  //? Mostrar mensaje de error si ocurrió un error al obtener los datos
  if (historyError) {
    return (
      <p className="text-red-500">
        Error loading history: {historyError.message}
      </p>
    );
  }

  //? Si no hay compras registradas
  if (!history?.purchases?.length) {
    return <p className="text-gray-500">There are no purchases recorded</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-base font-semibold text-right">
        Total corn purchases:{" "}
        <span className="text-xl">{history.totalPurchases || 0}</span>
      </p>

      <div
        className={`space-y-2 ${
          history.purchases.length > 5 ? "max-h-80 overflow-y-auto" : ""
        }`}
      >
        {history.purchases.map((purchase) => (
          <Card key={purchase.id}>
            <CardContent className="pt-4">
              <p className="text-sm">
                <strong>Purchase made on date and time:</strong>{" "}
                {purchase.purchaseTime}
              </p>
              <p className="text-sm">
                <strong>ID belonging to the client:</strong> {purchase.clientId}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
