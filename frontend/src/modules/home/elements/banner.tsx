import { Button } from "@nextui-org/button";
import React from "react";

const Banner = () => {
  return (
    <div className="bg-[#f7f5ff] h-[95vh] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/background.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      <div className="w-full h-full flex justify-center items-center relative z-10">
        <div className="absolute text-center z-10">
          <h1 className="font-dancingScript text-[1.5rem] md:text-[2xl] lg:text-[3rem] xl:text-[4rem] max-w-4xl mx-auto text-cyber-ink">
            Welcome to the Ultimate Newsletter and Blog Creation Platform
          </h1>
          <div className="flex w-full justify-center mt-4">
            <Button color="primary" className="text-xl !p-8">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
