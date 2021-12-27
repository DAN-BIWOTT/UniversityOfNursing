import React from 'react';
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

export default function IndexPage() {
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
