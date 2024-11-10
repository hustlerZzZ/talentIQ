import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

function Layout() {
  return (
    <div className="bg-zinc-100 p-4 h-screen grid grid-rows-[auto_1fr]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
