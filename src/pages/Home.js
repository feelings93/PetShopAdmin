import React from 'react';
import Box from '@mui/material/Box';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/cus/layout/navbar/Header';
import HeroSection from '../components/cus/layout/layoutHome/herosection/HeroSection';
import AllOurServices from '../components/cus/layout/layoutHome/ourservice/AllOurServices';
import AllCardPets from '../components/cus/layout/layoutHome/cardPet/AllCardPets';
import AllNewsReview from '../components/cus/layout/layoutHome/newsreview/AllNewsReview';
import AllCardReview from '../components/cus/layout/layoutHome/review/AllCardReview';
import About from './cus/About';
import Footer from '../components/cus/layout/footer/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Box sx={{ overflow: 'hidden' }}>
        <HeroSection />
        <AllOurServices />
        {/* <AllSales /> */}
        <AllCardPets />
        <AllNewsReview />
        <AllCardReview />
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
