/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import Masonry from 'react-masonry-component';
import SectionHeading from 'components/section-heading';
import FaqItem from 'components/cards/faq-item';

const data = [
  {
    id: 1,
    ques: 'What are our core values?',
    ans: `• Core competencies are quality, punctuality, and originality. Guaranteed privacy and Confidentiality Meets the changing needs and desires of nursing students`,
  },
  {
    id: 2,
    ques: 'Which services do we offer?',
    ans: `• Pre-assignment guidance: study guides, examination guides, pre-assignment guides/drafts, peer-reviewed article search, and topic sentence outlines with thematic peer-reviewed articles. 
    • Post-assignment guidance: Review and revision of complete or incomplete assignments, plagiarism removal services, grammar, and pre-marking.`,
  },
  {
    id: 3,
    ques: 'Who are we?',
    ans: `A team of professional tutors with over five years experience and expertise in BSN, MSN, APRN, & DNP programs especially in UK, Australia, Canada, and USA.`,
  },
  {
    id: 4,
    ques: 'What is our vision?',
    ans: `An efficient source of nursing knowledge.`,
  },
  {
    id: 5,
    ques: 'What is our Mission?',
    ans: `To teach nursing students the art of exploring and synthesizing scholarly materials and using the generated evidence to solve nursing assignments.`,
  },
];

const masonryOptions = { originTop: true };

const Faq = () => {
  return (
    <Box as="section" id="faq" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          slogan="Get yours question answer"
          title="Frequantly asked question"
        />
        <Masonry options={masonryOptions} sx={styles.grid}>
          {data.map((item) => {
            return <FaqItem key={item.id} faq={item} className="faq-item" />;
          })}
        </Masonry>
      </Container>
    </Box>
  );
};

export default Faq;

const styles = {
  section: {
    pt: [8, null, null, null, 10, 14],
    pb: [null, null, null, null, null, null, 10, 6],
  },
  grid: {
    mx: [null, null, null, -6, -8, 'unset'],
  },
};
