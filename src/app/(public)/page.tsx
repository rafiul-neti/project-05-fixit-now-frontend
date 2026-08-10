import React from "react";
import Slider from "./_components/Slider";
import Services from "./_components/Services";
import { getServices } from "./_actions/getServices";

const HomePage = async () => {
  const services = await getServices();
  return (
    <main>
      <Slider />

      <div className="">
        <Services services={services.data} />
      </div>
    </main>
  );
};

export default HomePage;
