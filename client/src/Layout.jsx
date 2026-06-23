import { Container, Stack } from "@mantine/core";

const Layout = ({ children }) => {
  return (
    <Container fluid>
      {/* <Container fluid py={100}> */}
        {children}
      {/* </Container> */}
    </Container>
  );
};

export default Layout;
