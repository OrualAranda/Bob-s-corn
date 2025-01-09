"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PurchaseHistorys } from "./PurchaseHistory";
import { useCornShop } from "@/hooks/useCornShop";

export const CornShopContainer = () => {
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    countdown: number;
  } | null>(null);

  const { purchaseCorn, isPurchasing, historyError } = useCornShop();

  //? Lógica para el contador de 1 minuto
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (notification?.type === "error" && notification.countdown > 0) {
      interval = setInterval(() => {
        setNotification((prev) => {
          if (prev && prev.countdown > 0) {
            return {
              ...prev,
              countdown: prev.countdown - 1,
            };
          }
          return prev;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [notification]);

  const handlePurchase = async () => {
    if (notification?.type === "error" && notification.countdown > 0) {
      return;
    }

    try {
      const response = await purchaseCorn();

      if (response.success) {
        setNotification({
          type: "success",
          message: response.message,
          countdown: 0,
        });
      } else {
        setNotification({
          type: "error",
          message: "Too many requests. Please wait a minute between purchases.",
          countdown: 60,
        });
      }

      console.log(response);
    } catch (error) {
      setNotification({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "The purchase could not be completed. Please try again.",
        countdown: 0,
      });
    }
  };

  useEffect(() => {
    if (notification?.countdown === 0 && notification.type === "error") {
      setNotification(null);
    }
  }, [notification?.countdown]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Corn Store 🌽</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={handlePurchase}
            disabled={isPurchasing}
          >
            {isPurchasing ? "Procesando..." : "BUY CORN 🌽"}
          </Button>
        </CardContent>
      </Card>

      {notification && (
        <Alert
          variant={notification.type === "error" ? "destructive" : "default"}
        >
          <AlertDescription>
            {notification.message}
            {notification.countdown > 0 && (
              <span className="ml-4 font-bold">
                {` ${Math.floor(notification.countdown / 60)
                  .toString()
                  .padStart(2, "0")}:${(notification.countdown % 60)
                  .toString()
                  .padStart(2, "0")}`}
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>CORN PURCHASE HISTORY</CardTitle>
        </CardHeader>
        <CardContent>
          {historyError ? (
            <Alert variant="destructive">
              <AlertDescription>{historyError.message}</AlertDescription>
            </Alert>
          ) : (
            <PurchaseHistorys />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
