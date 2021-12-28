/** @jsx jsx */
import {
  jsx,
  Box,
  Text,
  Heading,
} from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import { rgba } from 'polished';
import Image from 'components/image';
import Styled from 'styled-components';
import Video from "../assets/videos/travel.mp4"

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
      <HeroBg>
        <VideoBg src={Video} type="video/mp4" autoPlay loop muted playsInline />
      </HeroBg>
      <Container>
        <Box sx={styles.grid}>
          <Box as="form" sx={styles.domainCard}>
            <Heading>Get Professional Nursing Writers For Your Projects</Heading>
            <H3>Why Choose Us?</H3>
            <List>
              <ul>
                <li>Prices: cheap and based on complexity of assistance needed.</li>
                <li>Diversification of skills: services for all nursing cadres (BSN, MSN/APRN, and DNP) and disciplines (research, education, and practice, etc.)</li>
                <li>Freebies: Title page, revisions, plagiarism reports, bibliography, and formatting.</li>
                <li>Client-focused care</li>
                <li>Punctuality</li>
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
const Container = Styled.div`
  display: flex;
  height: 101vh;
  padding: 0 1rem;
  position: relative;
  margin-top:-8vh;
  :before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
  }
`
const styles = {
section:{
  marginBottom:"10vh",
},
  grid: {
    marginTop:"23vh",
    marginLeft:"6vw",
    zIndex:"3",
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
const H3 = Styled.h3`
margin-top: -35px ;
`

const HeroBg = Styled.div`
position: absolute;
top: 0;
bottom: 0;
right: 0;
left: 0;
width: 100%;
height: 100%;
overflow: hidden;
`

const VideoBg = Styled.video`
width: 100%;
height: 100%;
-o-object-fit: cover;
object-fit: cover;
z-index:-1;
`