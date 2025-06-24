import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Banner from "../components/home/Banner";
import RentalService from "../components/home/RentalService";
import RecentListings from "../components/home/RecentListings";
import LuxuryRides from "../components/home/LuxuryRides";
import ExperiencedDrivers from "../components/home/ExperiencedDrivers";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import HowItWorks from "../components/home/HowItWorks";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Helmet>
                <title>Home | Uni Drive</title>
            </Helmet>
            <div>
                <Banner />
            </div>
            <div>
                <HowItWorks />
            </div>
            <div>
                <RentalService />
            </div>
            <div>
                <RecentListings />
            </div>
            <div>
                <LuxuryRides />
            </div>
            <div>
                <ExperiencedDrivers />
            </div>
            <div>
                <Testimonials />
            </div>
            <div>
                <FAQ />
            </div>
        </div>
    );
};

export default Home;
