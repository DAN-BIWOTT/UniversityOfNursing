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
    border: (theme) => `1px solid ${theme.colors.borderColor}`,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: [107, null, null, 130],
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out 0s',
    boxShadow: '0 4px 8px 0 rgba(23, 64, 225, 0.2)',
    ':hover': {
      borderColor: 'transparent',
    },
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
