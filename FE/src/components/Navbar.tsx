import { Navbar, Group, Text, Button, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section>
        <Text size="xl" align="center">Quiz App</Text>
      </Navbar.Section>
      <Navbar.Section grow mt="lg">
        <Group direction="column" spacing="xs">
          <Link to="/login">
            <Button fullWidth variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button fullWidth variant="outline">Sign Up</Button>
          </Link>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavBar;
