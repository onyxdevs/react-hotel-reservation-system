declare global {
    type TypeRoom = {
        id: number;
        title: string;
        description: string;
        photo: string;
        price: number;
    };
    type TypeScenic = {
        id: number;
        title: string;
        photo: string;
        price_rate: number;
    };

    type TypeHotelDetails = {
        id: string;
        hotel_id: number;
        city: string;
        possibilities: string[];
        max_adult_size: number;
        child_status: boolean;
        room_type: TypeRoom[];
        room_scenic: TypeScenic[];
    };
}

export {};
