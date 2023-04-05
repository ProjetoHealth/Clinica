import React from 'react';
import Navigator from '../../components/Navigator';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';

import {
  Container
} from './styles';

function Home(){
  return(
    <>
      <Navigator />
      <Container>
        <Banner />
        <Footer />
      </Container>
    </>
  )
}
export default Home;