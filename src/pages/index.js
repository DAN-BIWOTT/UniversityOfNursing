import React,{useEffect} from 'react';
import Seo from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import Services from 'sections/services';
import PremiumFeature from 'sections/premium-feature';
// import UltimateFeatures from 'sections/ultimate-feature';
// import CustomerSupport from 'sections/customer-support';
// import Pricing from 'sections/pricing';
// import Testimonials from 'sections/testimonials';
import Blog from 'sections/blog';
import Faq from 'sections/faq';
import Support from 'sections/support';
import tawkTo from "tawkto-react";

export default function IndexPage() {

const tawkToPropertyId = '61caba6fc82c976b71c3c3c1'

const tawkToKey = '4dd464c8c21ae08a883035ce9eb7eb9baad96c68'

useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey)
}, [])


var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/61caba6fc82c976b71c3c3c1/1fnvughtt';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
  return (
    <Layout>
      <Seo
        title="University Of Nursing"
        description="A team of professional tutors with over five years experience and expertise in BSN, MSN, APRN, And DNP programs especially in UK, Australia, Canada, and USA."
      />
      <Banner />
      <Services />
      <PremiumFeature />
      <Blog />
      <Faq />
      <Support />
    </Layout>
  );
}
