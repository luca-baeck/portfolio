import React from 'react';

import { About, Footer, Header, Skills, Algorithms, Work } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => (
  <div className="app">
    <Navbar />
    <Header />
    <Work />
    <Skills />
    <Algorithms />
    <About />
    <Footer />
  </div>
);

export default App;
