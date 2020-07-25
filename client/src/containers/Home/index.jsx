import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import store from '../../store/store.js';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Aside from '../../components/Aside';
import Routing from '../Routing';

const Home = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <Header />
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
        <Aside />
        <Footer />
      </div>
    </Provider>
  )
}

export default Home
