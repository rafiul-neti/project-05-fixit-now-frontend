import React from "react";
import Slider from "./_components/Slider";
import Services from "./_components/Services";
import { getServices } from "./_actions/getServices";
import { getTechnicians } from "./_actions/getTechnicians";
import Technicians from "./_components/Technicians";

const HomePage = async () => {
  const services = await getServices();
  const technicians = await getTechnicians()
  return (
    <main>
      <Slider />

      <div className="">
        <Services services={services} />
        <Technicians technicians={technicians} />
      </div>
    </main>
  );
};

export default HomePage;
