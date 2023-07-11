import { ReactNode } from "react";
import ReactQueryProvider from "@/Providers/ReactQueryProvider/ReactQueryProvider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Providers;
