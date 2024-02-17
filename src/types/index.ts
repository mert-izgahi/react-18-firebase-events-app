export type EventType = {
    id?: string;
    slug?: string;
    title: string;
    description: string;
    date: string;
    location: string;
    images: string[];
    category: string;
    isFeatured: boolean;
    organizer: string;
    ticketLink: string;
    ticketPrice: number;
    capacity: number;
    soldTickets: number;
};

export type CategoryType = {
    id: string;
    name: string;
    slug: string;
};
