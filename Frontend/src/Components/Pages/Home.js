import React from "react";
import Navbar from "../Customer/Home/Navbar/Navbar";
import Banner from "../Customer/Home/Banner/Banner";
import Info from "../Customer/Home/Info/Info";
import About from "../Customer/Home/About/About";
import BookAppointment from "../Customer/Home/BookAppointment/BookAppointment";
import Reviews from "../Customer/Home/Review/Reviews";
import Doctors from "../Customer/Home/Doctor/Doctors";
import Footer from "../Customer/Home/Footer/Footer";


function Home() {

  return (
    <div className="home-section">
      <Navbar />
      <Banner />
      <Info/>
      <About />
      <BookAppointment />
      <Reviews />
      <Doctors />
      <Footer />
      
    </div>
  );
}

export default Home;
