import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import { EventType } from "../../types";
import { Link } from "react-router-dom";
import { IoCalendar, IoLocation } from "react-icons/io5";

function EventCard({ event }: { event: EventType }) {
    return (
        <Card>
            <CardHeader p={0} position="relative">
                <Image
                    src={event.images[0]}
                    alt={event.title}
                    height="250px"
                    objectFit="cover"
                    w="100%"
                    borderTopRadius="md"
                />

                <Flex p={4} position="absolute" top={0} w="100%">
                    <Badge colorScheme="gray">{event.category}</Badge>
                </Flex>
            </CardHeader>

            <CardBody p={4}>
                <Flex align="center" justify="space-between" gap={4} mb={4}>
                    <Flex align="center">
                        <Text color="primary.500">
                            <IoCalendar />
                        </Text>
                        <Text ml={2}>{event.date}</Text>
                    </Flex>
                    <Flex align="center">
                        <Text color="primary.500">
                            <IoLocation />
                        </Text>
                        <Text ml={2}>{event.location}</Text>
                    </Flex>
                </Flex>
                <Heading as={Link} to={`/events/${event?.slug}`} size="md">
                    {event.title}
                </Heading>
                <Text>{event.description}</Text>
            </CardBody>
        </Card>
    );
}

export default EventCard;
