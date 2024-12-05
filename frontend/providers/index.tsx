import { Toaster } from 'sonner';
import AuthProvider from './auth-provider';
import { ThemeProvider } from './theme-provider';

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster
          expand
          visibleToasts={5}
          richColors
          toastOptions={{}}
          duration={4000}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}
