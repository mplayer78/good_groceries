import { UIStateProvider } from "./State/UIContext";
import { ProductStateProvider } from "./State/ProductContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIStateProvider>
      <ProductStateProvider>{children}</ProductStateProvider>
    </UIStateProvider>
  );
}
