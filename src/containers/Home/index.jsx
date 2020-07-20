import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import Chat from '../Chat';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Aside from '../../components/Aside';

const Home = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <Header />
        <Chat/>
        <Aside />
        <Footer />
      </div>
    </Provider>
  )
}

export default Home
