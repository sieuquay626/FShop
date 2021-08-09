import React, { useEffect } from 'react';
// import Loader from '../../elements/loader';
import Header from '../../elements/Header';
import SlideBanners from '../../elements/SlideBanners';
import CardList from '../../elements/CardList';
// import ChatBot from 'react-simple-chatbot';
import Footer from '../../elements/Footer';
import Advertisement from '../../elements/Advertisement';
import Benefit from '../../elements/Benefit';
import { useDispatch, useSelector } from 'react-redux';
import LeftSidebar from '../../elements/LeftSidebar';
import ListProduct from '../../elements/ListProduct';
import { handlePopularProduct } from '../../../redux/actions/product';
import ProductRecomment from '../../elements/ProductRecomment';
// const steps = [
//   {
//     id: '1',
//     message: 'What is your name?',
//     trigger: 'name'
//   },
//   {
//     id: 'name',
//     user: true,
//     trigger: '3'
//   },
//   {
//     id: '3',
//     message: 'Hi {previousValue}, nice to meet you!',
//     trigger: '4'
//   },
//   {
//     id: '4',
//     message: 'How old are you?',
//     trigger: 'age'
//   },
//   {
//     id: 'age',
//     user: true,
//     validator: value => {
//       if (isNaN(value)) {
//         return 'value should be a number';
//       }
//       return true;
//     },
//     trigger: '5'
//   },
//   {
//     id: '5',
//     message: 'Hi {previousValue}! What is your gender?',
//     trigger: 'gender'
//   },
//   {
//     id: 'gender',
//     options: [
//       { value: 'male', label: 'Male', trigger: '1' },
//       { value: 'female', label: 'Female', trigger: '1' }
//     ]
//   }
// ];

const HomePage = () => {
  const filter = useSelector(state => state.filter);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handlePopularProduct(filter));
  }, []);

  return (
    <>
      <Header />
      <SlideBanners />
      <div className='home-content'>
        <div className='home-container'>
          <CardList />
        </div>
      </div>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-3'>
              <LeftSidebar />
            </div>
            <div className='col-sm-9'>
              <ListProduct />
            </div>
          </div>
          <div className='row'>{auth.user && <ProductRecomment />}</div>
        </div>
      </section>
      <Benefit />
      <Advertisement />
      <Footer />
      {/* <div className='chatbox'>
        <ChatBot
          headerTitle='Speech Recognition'
          recognitionEnable={true}
          steps={steps}
        />
      </div> */}
    </>
  );
};

export default HomePage;
