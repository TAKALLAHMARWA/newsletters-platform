import Header from '@/shared/widgets/header/header'
import React from 'react'
import Banner from './elements/banner';
import Branding from "@/modules/home/elements/branding";
import Benefits from "@/modules/home/elements/benefits";   
import FeatureHighlight from "@/modules/home/elements/feature.highlight";
import Footer from "@/shared/widgets/footer/footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Branding/>
      <Benefits />
      <FeatureHighlight />
      <Footer/>
    </div>
  )
}

export default Home

