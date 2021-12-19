/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import Service from 'components/cards/service';

const services = [
  {
    title: 'Blog Hosting',
    price: 900,
  },
  {
    title: 'School Project Web Hosting',
    price: 500,
  },
  {
    title: 'Small Business Web Hosting',
    price: 1400,
  },
  {
    title: 'Start-Up Company Web Hosting',
    price: 2000,
  }
];

const Services = () => {
  return (
    <Box as="section" id="services" sx={styles.section}>
      <Container>
        <SectionHeading
          slogan="Ideal solutions for you"
          title="Didn’t find what you were looking for?"
        />
        <Box sx={styles.grid}>
          {services.map((service, i) => (
            <Service key={i} service={service} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;

const styles = {
  section: {
    pt: [8, null, null, null, 10, 12],
    pb: [12, null, null, null, null, 15],
  },
  grid: {
    gap: [3, null, null, 4],
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: [
      'repeat(2, 1fr)',
      null,
      null,
      'repeat(3, 1fr)',
      null,
      'repeat(4, 1fr)',
      'repeat(4, 300px)',
    ],
  },
};
