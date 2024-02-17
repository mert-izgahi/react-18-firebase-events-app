import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <Box
                sx={{
                    overflow: "hidden",
                    position: "relative",
                    height: "100vh",
                    width: "100vw",
                    background:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url('../assets/header-img.jpg') center/cover no-repeat fixed",
                    color: "white",
                }}
            >
                <Center p={8} w={"100vw"} as="header" h="80vh" flexDir="column">
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color="primary.500"
                        mb="8"
                    >
                        Welcome to MeetX
                    </Text>
                    <Heading
                        fontSize={["xl", "2xl", "3xl"]}
                        fontWeight="bold"
                        mb="8"
                    >
                        Make Real Connections With{" "}
                        <Text color="primary.500" as={Link} to="/">
                            MeetX
                        </Text>
                    </Heading>

                    <Text
                        fontSize={["sm", "md", "lg"]}
                        fontWeight="bold"
                        align="center"
                    >
                        MeetX is a platform that helps you connect with like
                        minded individuals.
                    </Text>

                    <Flex align="center" justify="center" mt={8} gap={8}>
                        <Link to="/events">
                            <Button
                                size={["sm", "md"]}
                                colorScheme="primary"
                                mt={8}
                            >
                                Explore Events
                            </Button>
                        </Link>

                        <Link to="/events">
                            <Button
                                size={["sm", "md"]}
                                colorScheme="gray"
                                mt={8}
                            >
                                Post Event
                            </Button>
                        </Link>
                    </Flex>
                </Center>
            </Box>
        </>
    );
}

export default HomePage;
