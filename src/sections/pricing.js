/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import Slider from 'react-slick';
import SectionHeading from 'components/section-heading';
import PriceTable from 'components/cards/price-table';
import SlickArrow from 'components/slick-arrow';

const data = [
  {
    id: 1,
    title: 'Student Pack',
    subtitle: 'For the students that need their basic school project requirements met',
    price: '2,000-5,000',
    isRecommended: false,
    buttonText: 'Get Started',
    features: [
      {
        id: 1,
        isAvailable: true,
        title: 'Project delivery 2-3 weeks.',
      },
      {
        id: 2,
        isAvailable: true,
        title: `4 zoom meetings explaining how the project objectives have been met.`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `Free hosting for a month.`,
      },
      {
        id: 4,
        isAvailable: true,
        title: `AI projects, mobile applications, web applications, algorithm implimentations etc.`,
      },
      {
        id: 5,
        isAvailable: false,
        title: `Documentation of project. (Only software developement shall be done)`,
      },
    ],
  },
  {
    id: 2,
    title: 'Small Business Pack',
    subtitle: 'For small businesses with basic requirements.',
    price: '5,000-9,000',
    isRecommended: true,
    buttonText: 'Get Started',
    features: [
      {
        id: 1,
        isAvailable: true,
        title: 'Database to store and manage your products.',
      },
      {
        id: 2,
        isAvailable: true,
        title: `Beautiful application designs.`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `Dedicated project managers that will make sure your projects are delivered on time`,
      },
      {
        id: 4,
        isAvailable: true,
        title: `Beautiful adminstration panel.`,
      },
      {
        id: 5,
        isAvailable: true,
        title: `Custom features can be requested and pricing can be negotiated with your project manager`,
      },
    ],
  },
  {
    id: 3,
    title: 'Startup Company Plan',
    subtitle: 'For the ultimate company team who work with new come data stack',
    price: '10,000-30,000',
    isRecommended: false,
    buttonText: 'Get Started',
    features: [
      {
        id: 1,
        isAvailable: true,
        title: 'Private source code.',
      },
      {
        id: 2,
        isAvailable: true,
        title: `Project developement costs and software purchase done by JODAWAKI.`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `Purchase of domain name done by JODAWAKI`,
      },
      {
        id: 4,
        isAvailable: true,
        title: `Relational database design and developement included.`,
      },
      {
        id: 5,
        isAvailable: true,
        title: `High security consideration throughout developement`,
      },
      {
        id: 6,
        isAvailable: true,
        title: `Timely deliveries ensured by project managers`,
      },
    ],
  },
];

const settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  nextArrow: <SlickArrow control="next" />,
  prevArrow: <SlickArrow control="prev" />,
  responsive: [
    {
      breakpoint: 100000,
      settings: 'unslick',
    },
    {
      breakpoint: 768,
      settings: {
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Pricing = () => {
  return (
    <Box as="section" id="pricing" sx={styles.section}>
      <Container sx={styles.container}>
        <SectionHeading
          sx={styles.heading}
          slogan="You may discuss with your project manager to get a custom price plan."
          title="Common pricing plans that may best define you"
        />
        <Slider sx={styles.grid} {...settings}>
          {data?.map((price, index) => (
            <PriceTable price={price} key={index} />
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Pricing;

const styles = {
  section: {
    pt: [6],
    pb: [12, null, null, 15, 17],
  },
  container: {
    pl: 0,
    pr: 0,
  },
  heading: {
    mb: [7, null, null, null, 14, null, 18],
    px: [6, null, null, 0],
    h3: {
      fontSize: [3, null, null, 8],
    },
  },
  grid: {
    gap: [null, null, null, null, 6],
    display: [null, null, null, null, 'grid'],
    gridTemplateColumns: [null, null, null, null, 'repeat(3, 1fr)'],
    alignItems: [null, null, null, null, 'flex-end'],
    '.slick-slide > div': {
      p: ['35px', '40px', null, '35px 23px 23px', 0],
    },
    '.slick-arrow': {
      bottom: -5,
    },
  },
};
