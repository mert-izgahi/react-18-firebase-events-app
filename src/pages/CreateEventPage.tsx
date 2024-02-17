import { Container, Heading, Text } from "@chakra-ui/react";
import EventForm from "../components/forms/EventForm";

function CreateEventPage() {
    return (
        <Container maxW="container.xl" p={4}>
            <Text
                fontWeight="bold"
                fontSize="lg"
                mb={4}
                color="primary.500"
                align="center"
            >
                Submit an event
            </Text>
            <Heading fontSize="2xl" mb={4} textAlign="center">
                Fill out the form below to submit an event
            </Heading>
            <EventForm />
        </Container>
    );
}

export default CreateEventPage;
