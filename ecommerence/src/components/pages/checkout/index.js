import React from 'react';
import Header from '../../elements/Header';
import Footer from '../../elements/Footer';
import StepTracker from './StepTracker';

const CheckOutPage = () => {
  return (
    <>
      <Header />
      <main className='content'>
        <div className='checkout'>
          <StepTracker current={2} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckOutPage;
