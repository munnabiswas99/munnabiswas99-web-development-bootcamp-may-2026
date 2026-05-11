import React from "react";
import { NavLink } from "react-router";
import Banner from "../../components/home/Banner";
import CardSection from "../../components/home/CardSection";

const Home = () => {
  return (
    <div className="p-10">
        <Banner></Banner>
        <CardSection></CardSection>
    </div>
  );
};

export default Home;
