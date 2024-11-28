import { NavbarProvider } from "../../context/NavbarContext";
import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';
import Navbar from '../../components/Dashboard/Navbar/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <NavbarProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <div className="w-1/5">
          <Sidebar />
        </div>

        <div className="w-4/5 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto p-3 bg-slate-400">
            <div className="text-gray-900 bg-slate-100 border p-3 h-auto rounded-xl">{children}</div>
            </main>
        </div>
      </div>
    </NavbarProvider>
  );
};

export default DashboardLayout;
