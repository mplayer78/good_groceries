import logo from "./logo.svg";
import "./App.css";
import { UIStateProvider } from "./State/UIContext";
import { ProductStateProvider } from "./State/ProductContext";
import Layout from "./Components/Layout";
import FrontPage from "./Components/FrontPage";

function App() {
  return (
    <div className="App">
      <UIStateProvider>
        <ProductStateProvider>
          <Layout>
            <FrontPage />
          </Layout>
        </ProductStateProvider>
      </UIStateProvider>
    </div>
  );
}

export default App;
