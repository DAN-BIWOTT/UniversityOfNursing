/** @jsx jsx */
import { jsx, Link as A } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";
import { Link as MenuLink } from "react-scroll";
import { HiOutlineChevronRight } from "react-icons/hi";

export function NavLink({ path, label, children, ...rest }) {
  if (path === "PaperBank") {
    return (
      <Link
        to="/PaperBank"
        className="nav-item"
        activeClass="active"
        sx={{ textDecoration: "none" }}
        {...rest}
      >
        {label}
      </Link>
    );
  } else if (path === "UonBlog") {
    return (
      <Link
        to="https://uonke.blogspot.com/"
        className="nav-item"
        activeClass="active"
        sx={{ textDecoration: "none" }}
        {...rest}
      >
        {label}
      </Link>
    );
  } else {
    return (
      <MenuLink
        to={path}
        spy={true}
        offset={-70}
        smooth={true}
        duration={500}
        className="nav-item"
        activeClass="active"
        {...rest}
      >
        {label}
      </MenuLink>
    );
  }
}

export function Link({ path, label, children, ...rest }) {
  return (
    <A as={GatsbyLink} to={path} {...rest}>
      {children ? children : label}
    </A>
  );
}

export function LearnMore({ path, label, children, ...rest }) {
  return (
    <A sx={styles.learnMore} href={path} {...rest}>
      {label ?? "Learn More"} <HiOutlineChevronRight />
    </A>
  );
}

const styles = {
  learnMore: {
    alignItems: "center",
    color: "link",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: [1, null, null, 2],
    fontWeight: 500,
    textDecoration: "none",
    svg: {
      transition: "margin-left 0.3s ease-in-out 0s",
      ml: "3px",
    },
    ":hover": {
      svg: {
        ml: "5px",
      },
    },
  },
};
