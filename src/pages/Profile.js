import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';

function Profile() {
  const { search } = useContext(MyContext);
  return (
    <section>
      <section>
        <Header />
        {search && <SearchBar />}
      </section>
      <Footer />
    </section>
  );
}

export default Profile;
