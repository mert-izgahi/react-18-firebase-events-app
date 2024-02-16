import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../components/ui/Logo";
function Navbar() {
    const isAuthenticated = true;
    return (
        <Flex as="nav" p={4}>
            <Container maxW="container.xl">
                <Flex justify="flex-start" gap="8" align="center">
                    <Logo />
                    <Flex gap="4" align="center" flex={1}>
                        <Text as={Link} to={"/"}>
                            Home
                        </Text>
                        <Text as={Link} to={"/events"}>
                            Events
                        </Text>
                        {isAuthenticated && (
                            <Text as={Link} to={"/profile"}>
                                Profile
                            </Text>
                        )}

                        <Flex align="center" gap="4" ml="auto">
                            {!isAuthenticated && (
                                <Text as={Link} to={"/login"}>
                                    Login
                                </Text>
                            )}

                            {isAuthenticated && (
                                <Button as={Link} to={"/events/create"}>
                                    Post Event
                                </Button>
                            )}

                            {isAuthenticated && (
                                <Button variant="outline">Logout</Button>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Flex>
    );
}

export default Navbar;
