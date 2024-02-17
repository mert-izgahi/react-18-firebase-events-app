import { Container, Heading, Text } from "@chakra-ui/react";
import RegisterForm from "../components/forms/RegisterForm";

function RegisterPage() {
    return (
        <Container maxW="container.xl">
            <Text
                fontWeight="bold"
                fontSize="lg"
                mb={4}
                color={"primary.500"}
                align={"center"}
            >
                Create an account
            </Text>
            <Heading textAlign={"center"} mb={8}>
                Please Fill out the form below
            </Heading>
            <RegisterForm />
        </Container>
    );
}

export default RegisterPage;
