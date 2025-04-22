"use client";

import type React from "react";

// Adapted from shadcn/ui toast component
import { useState, useEffect, useCallback } from "react";

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
};

export type Toast = ToastProps & {
  id: string;
  visible: boolean;
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 1000;

export type ToasterToast = ToastProps & {
  id: string;
  visible: boolean;
};

let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  const dismiss = useCallback((toastId?: string) => {
    setToasts((toasts) =>
      toasts.map((toast) =>
        toast.id === toastId || toastId === undefined
          ? {
              ...toast,
              visible: false,
            }
          : toast
      )
    );
  }, []);

  const toast = useCallback(
    ({ ...props }: ToastProps) => {
      const id = props.id || generateId();
      const duration = props.duration || 5000;

      setToasts((prevToasts) => {
        const newToast = {
          ...props,
          id,
          visible: true,
        };

        // If we already have the maximum number of toasts, remove the oldest one
        if (prevToasts.length >= TOAST_LIMIT) {
          const oldestToastIndex = prevToasts.findIndex(
            (toast) => toast.visible === false
          );
          if (oldestToastIndex !== -1) {
            prevToasts.splice(oldestToastIndex, 1);
          } else {
            prevToasts.shift();
          }
        }

        return [...prevToasts, newToast];
      });

      // Auto-dismiss after duration
      setTimeout(() => {
        dismiss(id);
      }, duration);

      return id;
    },
    [dismiss]
  );

  // Remove toasts after they're no longer visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.visible));
    }, TOAST_REMOVE_DELAY);

    return () => clearTimeout(timer);
  }, [toasts]);

  return {
    toast,
    dismiss,
    toasts,
  };
}
