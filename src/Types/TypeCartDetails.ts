declare global {
    type TypeCartDetails = {
        cart: {
            hotelId?: string;
            checkin?: string;
            checkout?: string;
            days?: string;
            adults?: string;
            children?: string;
            roomType?: string;
            viewType?: string;
            coupon?: {
                data: TypeCoupon;
                status: string;
                error: string;
            };
            newReservation: {
                data: any;
                status: string;
                error: string;
            };
            reservationId?: string;
        };
    };
}

export {};
