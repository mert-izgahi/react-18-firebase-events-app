import { SimpleGrid } from "@chakra-ui/react";
import { EventType } from "../../types";
import EventCard from "./EventCard";

function EventsGrid({ events }: { events: EventType[] }) {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </SimpleGrid>
    );
}

export default EventsGrid;
