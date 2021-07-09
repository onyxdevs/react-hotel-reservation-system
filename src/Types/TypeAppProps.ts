declare global {
    type TypeAppProps = {
        hotels: {
            data: {
                names: TypeHotel[];
                details: TypeHotelDetails[];
            };
            status: string;
            error: string;
        };
    };
}

export {};
