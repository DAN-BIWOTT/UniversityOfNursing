/** @jsx jsx */
import {
  jsx,
  Box,
  Text,
  Heading,
  Container,
} from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import { rgba } from 'polished';
import Image from 'components/image';
import Styled from 'styled-components';


const Banner = () => {
 

  const data = useStaticQuery(graphql`
    query {
      serverRack: file(relativePath: { eq: "server-rack.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Box as="section" id="home" sx={styles.section}>
      <Container>
        <Box sx={styles.grid}>
          <Box as="form" sx={styles.domainCard}>
            <Heading>Grow your business with a website</Heading>
            <List>
              <ul>
                <li>~ Cheap Hosting</li>
                <li>~ Cheap Domain Names</li>
                <li>~ Top Class Services On A Budget</li>
                <li>~ Work With Certified Professionals And Meet Your Business Needs</li>
              </ul>
            </List>
            <Text as="p" sx={styles.note}>
              Expose yourself to the world.
            </Text>
          </Box>
          <Box as="figure" sx={styles.illustration}>
            <Image
              src={data.serverRack.childImageSharp.fluid}
              loading="lazy"
              alt="sever-rack"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
  grid: {
    gap: ['30px 60px', null, null, null, '30px 40px', '30px 60px'],
    display: 'grid',
    minHeight: [null, null, null, null, null, '66vh', '81vh'],
    alignItems: 'center',
    gridTemplateColumns: [
      '1fr',
      null,
      null,
      null,
      'repeat(2, 1fr)',
      '510px 1fr',
    ],
  },
  domainCard: {
    background: 'white',
    boxShadow: '0px 24px 50px rgba(54, 91, 125, 0.05)',
    borderRadius: 10,
    p: ['30px 25px 50px', null, null, '40px 40px 60px'],
    m: [null, null, null, '0 auto', 'unset'],
    maxWidth: [null, null, null, 480, 'none'],
    h2: {
      fontWeight: 700,
      fontSize: [8, null, null, 10, 9, 14],
      lineHeight: 1.36,
      letterSpacing: 'heading',
      color: 'textSecondary',
      mb: [5, null, null, 7, 8],
    },
  },
  note: {
    fontStyle: 'italic',
    fontSize: [0, null, null, '15px'],
    lineHeight: 1.33,
    textAlign: 'center',
    color: rgba('#02073E', 0.5),
    mt: [4],
  },
};

const List = Styled.div`

  li{
    font-size: 1rem clamp(25px);
    list-style-type:none;
  }
`