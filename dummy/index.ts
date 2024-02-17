import { EventType } from "./../src/types/index";
import { faker } from "@faker-js/faker";

const events: EventType[] = [];

const generateEvent = () => {
    const event = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        slug: faker.helpers.slugify(faker.lorem.word()),
        description: faker.lorem.paragraph(),
        date: faker.date.recent().toDateString(),
        location: faker.location.city(),
        images: [
            "https://source.unsplash.com/random?music",
            "https://source.unsplash.com/random?music",
        ],
        category: faker.helpers.arrayElement(["Music", "Art", "Sports"]),
        isFeatured: faker.datatype.boolean(),
        organizer: faker.person.fullName(),
        ticketLink: faker.internet.url(),
        ticketPrice: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
        capacity: faker.number.int({ min: 0, max: 100 }),
        soldTickets: faker.number.int({ min: 0, max: 100 }),
    };
    events.push(event);
};

for (let i = 0; i < 10; i++) {
    generateEvent();
}

export default events;
