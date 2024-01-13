import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="text-white flex flex-col min-h-screen bg-black bg-opacity-25">
      <Header />
      <Hero />
      <div className="flex-1 container mx-auto py-4 flex">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
