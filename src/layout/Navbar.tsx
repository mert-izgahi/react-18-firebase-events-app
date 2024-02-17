import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../components/ui/Logo";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        auth.currentUser !== null
    );

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsAuthenticated(!!user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Flex as="nav" p={4}>
            <Container maxW="container.xl">
                <Flex justify="flex-start" gap="8" align="center">
                    <Logo />
                    <Flex gap="4" align="center" flex={1}>
                        <Flex align="center" gap="4" display={["none", "flex"]}>
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
                        </Flex>

                        <Flex align="center" gap="4" ml="auto">
                            {!isAuthenticated && (
                                <Button
                                    size={["sm", "md"]}
                                    as={Link}
                                    to={"/login"}
                                >
                                    Login
                                </Button>
                            )}
                            {isAuthenticated && (
                                <Button
                                    size={["sm", "md"]}
                                    as={Link}
                                    to={"/events/create"}
                                >
                                    Post Event
                                </Button>
                            )}
                            {isAuthenticated && (
                                <Button
                                    onClick={handleLogout}
                                    size={["sm", "md"]}
                                    variant="outline"
                                >
                                    Logout
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Flex>
    );
}

export default Navbar;
