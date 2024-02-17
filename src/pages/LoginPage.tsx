import { Container, Heading, Text } from "@chakra-ui/react";
import LoginForm from "../components/forms/LoginForm";

function LoginPage() {
    return (
        <Container maxW="container.xl">
            <Text
                fontWeight="bold"
                fontSize="lg"
                mb={4}
                color={"primary.500"}
                align={"center"}
            >
                Login to your account
            </Text>
            <Heading textAlign={"center"} mb={8}>
                Please Fill out the form below
            </Heading>
            <LoginForm />
        </Container>
    );
}

export default LoginPage;
