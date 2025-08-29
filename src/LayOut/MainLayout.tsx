import { Outlet } from "react-router-dom";
import Footer from "../SharedComponents/Footer";
import Header from "../SharedComponents/Header";


const MainLayout = () => {
    return (
        <div className="">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;