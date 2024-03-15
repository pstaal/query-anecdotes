import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

import { MessageContextProvider } from "./components/MessageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MessageContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MessageContextProvider>
);
