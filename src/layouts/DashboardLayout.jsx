import AddCar from "../pages/AddCar";
import MyBookings from "../pages/MyBookings";
import MyCars from "../pages/MyCars";

const DashboardLayout = () => {
    return (
        <div>
            <AddCar />
            <MyCars />
            <MyBookings />
        </div>
    );
};

export default DashboardLayout;