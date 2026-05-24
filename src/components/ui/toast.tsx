"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

type ToastVariant = "success" | "error" | "info";

interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: ToastVariant;
  title?: string;
  description?: string;
}

const iconMap: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="h-4 w-4 text-[#10B981]" />,
  error: <AlertCircle className="h-4 w-4 text-[#EF4444]" />,
  info: <Info className="h-4 w-4 text-[#3B82F6]" />,
};

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, variant = "info", title, description, ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 shadow-2xl transition-all",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
        "data-[state=open]:animate-slide-up data-[state=closed]:fade-out",
        className
      )}
      {...props}
    >
      <span className="mt-0.5 shrink-0">{iconMap[variant]}</span>
      <div className="flex-1 min-w-0">
        {title && <ToastPrimitive.Title className="text-sm font-semibold text-[var(--text-primary)]">{title}</ToastPrimitive.Title>}
        {description && <ToastPrimitive.Description className="mt-0.5 text-xs text-[var(--text-secondary)]">{description}</ToastPrimitive.Description>}
      </div>
      <ToastPrimitive.Close className="shrink-0 rounded p-0.5 opacity-50 hover:opacity-100 transition-opacity">
        <X className="h-3.5 w-3.5" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
);
Toast.displayName = "Toast";

type ToastState = {
  id: string;
  variant: ToastVariant;
  title?: string;
  description?: string;
  open: boolean;
};

const ToastContext = React.createContext<{
  toast: (opts: Omit<ToastState, "id" | "open">) => void;
} | null>(null);

export function ToastProviderWrapper({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastState[]>([]);

  const toast = React.useCallback((opts: Omit<ToastState, "id" | "open">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...opts, id, open: true }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider swipeDirection="right" duration={4000}>
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            title={t.title}
            description={t.description}
            open={t.open}
            onOpenChange={(open) => {
              if (!open) setToasts((prev) => prev.filter((x) => x.id !== t.id));
            }}
          />
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProviderWrapper");
  return ctx;
}

export { Toast, ToastProvider, ToastViewport };
