import "./App.css";
import Layout from "./Components/Layout";
import FrontPage from "./Components/FrontPage";
import { Providers } from "./Providers";

function App() {
  return (
    <div className="App">
      <Providers>
        <Layout>
          <FrontPage />
        </Layout>
      </Providers>
    </div>
  );
}

export default App;
