import { Container, Flex, Text } from "@chakra-ui/react";

function Footer() {
    return (
        <Flex
            as="footer"
            bg="primary.500"
            color="white"
            align="center"
            justify="center"
            p={8}
        >
            <Container maxW="container.xl" p={4}>
                <Text align="center">© {new Date().getFullYear()} MeetX.</Text>
                <Text align="center">All rights reserved.</Text>
            </Container>
        </Flex>
    );
}

export default Footer;
