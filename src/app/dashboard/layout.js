import Sidebar from '../../components/Dashboard/Sidebar';
import Navbar from '../../components/Dashboard/Navbar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <div className="w-1/5">
                <Sidebar />
            </div>

            <div className="w-4/5 flex flex-col">
                <Navbar sectionName="Test" sectionDesc="This is a test section"/>
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
