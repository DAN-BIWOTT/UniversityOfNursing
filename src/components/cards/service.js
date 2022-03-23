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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: [107, null, null, 130],
    textAlign: 'center',
    p: {
      fontWeight: 600,
      fontSize: [2, null, null, '17px'],
      lineHeight: 1.77,
      color: '#968F89',
    },
    span: {
      color: 'primary',
      fontWeight: 700,
      fontSize: [1, null, null, '15px'],
      lineHeight: 2,
    },
  },
};
