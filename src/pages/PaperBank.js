import React from 'react'
import Footer from '../components/footer/footer.js';
import SearchHeader from '../components/Ecommerce/SearchHeader';
import EcommerceBody from '../components/Ecommerce/EcommerceBody';
import TopBar from '../components/topbar';

const PaperBank = () => {
    return (
        <>
            <TopBar />
            <SearchHeader />
            <EcommerceBody />
            <Footer />
        </>
    )
}

export default PaperBank
