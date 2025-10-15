import { useState } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36);
    setToasts((prev) => [...prev, { ...props, id }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toast, toasts };
}