import { lazy, Suspense, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useAppSelector } from "./hooks/useRedux";
import Layout from "./components/Layout/Layout";

// Lazy-loaded pages for code-splitting
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
  </div>
);

const AppContent = () => {
  const [page, setPage] = useState("dashboard");
  const darkMode = useAppSelector((s) => s.ui.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const renderPage = () => {
    switch (page) {
      case "transactions":
        return <TransactionsPage />;
      case "insights":
        return <InsightsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Layout activePage={page} onNavigate={setPage} title={page}>
      <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
    </Layout>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
