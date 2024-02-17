import { useParams } from "react-router-dom";
import events from "../../dummy";
import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import BackButton from "../components/buttons/BackButton";
import { IoCalendar, IoLocation, IoPeople, IoTicket } from "react-icons/io5";

function EventPage() {
    const { slug } = useParams();
    const event = events.find((event) => event.slug === slug);

    return (
        <>
            <Container maxW="container.xl" p={4} my={4}>
                <BackButton />
            </Container>
            <Box
                h="60vh"
                sx={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url("${event?.images[0]}") center/cover no-repeat fixed`,
                    position: "relative",
                }}
            >
                <Container maxW="container.xl" p={4}>
                    <Badge>{event?.category}</Badge>
                </Container>
            </Box>
            <Container maxW="container.xl" p={4}>
                <Grid
                    templateColumns={[
                        "repeat(1, 1fr)",
                        "repeat(1, 1fr)",
                        "repeat(3, 1fr)",
                    ]}
                    gap={4}
                >
                    <GridItem colSpan={[1, 2]}>
                        <Stack gap={"4"}>
                            <Heading>{event?.title}</Heading>
                            <Flex
                                align="center"
                                justify="flex-start"
                                flexWrap="wrap"
                                gap={8}
                                mb={4}
                            >
                                <Flex align="center">
                                    <Text color="primary.500">
                                        <IoCalendar />
                                    </Text>
                                    <Text ml={2}>{event?.date}</Text>
                                </Flex>
                                <Flex align="center">
                                    <Text color="primary.500">
                                        <IoLocation />
                                    </Text>
                                    <Text ml={2}>{event?.location}</Text>
                                </Flex>
                                <Flex align="center">
                                    <Text color="primary.500">
                                        <IoPeople />
                                    </Text>
                                    <Text ml={2}>{event?.capacity}</Text>
                                </Flex>

                                <Flex align="center">
                                    <Text color="primary.500">
                                        <IoTicket />
                                    </Text>
                                    <Text ml={2}>{event?.soldTickets}</Text>
                                </Flex>
                            </Flex>
                            <Text fontWeight={"bold"}>Description</Text>
                            <Text>{event?.description}</Text>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={[1, 1]}>
                        <Card>
                            <CardHeader p={0}>
                                <Image
                                    src={event?.images[0]}
                                    alt={event?.title}
                                    height="250px"
                                    objectFit="cover"
                                    w="100%"
                                    borderTopRadius="md"
                                />
                            </CardHeader>

                            <CardBody>
                                <Text mb={4}>
                                    Organizer: {event?.organizer}
                                </Text>

                                <Button w={"full"}>
                                    Buy Ticket: ${event?.ticketPrice}
                                </Button>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </Container>
        </>
    );
}

export default EventPage;
