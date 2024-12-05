import { toast } from 'sonner';

type CommonProps = {
  variant?: 'success' | 'error' | 'info';
  message: string;
  delay?: undefined;
};

type PromiseProps = {
  variant: 'promise';
  message: string;
  delay?: number;
};

type NotificationProps = CommonProps | PromiseProps;

export default function useNotification() {
  const showNotification = ({
    variant = 'success',
    message,
    delay = 2000,
  }: NotificationProps) => {
    // Handle promise variant
    if (variant === 'promise') {
      // Create a promise with async/await
      const promise = async () =>
        await new Promise((resolve) =>
          setTimeout(() => resolve('succeed'), delay)
        );

      toast.promise(promise, {
        loading: message,
        success: (_) => 'Success',
        error: 'Error',
      });

      return;
    }

    // Handle success, error and info variants
    toast[variant](message);
  };

  return showNotification;
}
