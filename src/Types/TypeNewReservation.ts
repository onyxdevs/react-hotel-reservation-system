declare global {
    type TypeNewReservation = {
        hotel_id?: number;
        start_date?: string;
        end_date?: string;
        adult?: number;
        child?: number;
        room_type?: number;
        room_scenic?: number;
        price?: number;
        coupon_code?: string;
        card_name?: string;
        card_number?: string;
        card_date_month?: string;
        card_date_year?: string;
        card_cvv?: string;
        id?: string;
    };
}

export {};
