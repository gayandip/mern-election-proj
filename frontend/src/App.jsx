import Layout from "./pages/Layout.jsx";
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Layout />
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
