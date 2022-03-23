/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui';

const Service = ({ service }) => {
  return (
    <li sx={styles.service}>
      <Text as="p">{service.title}</Text>
    </li>
  );
};

export default Service;

const styles = {
  service: {
    backgroundColor:"#fff",
    float:'left',
margin:"0 5px",
  },
};
