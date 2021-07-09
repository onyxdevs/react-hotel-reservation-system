declare global {
    type TypeCoupon = {
        id?: string;
        code?: string;
        discount_ammount?: number;
        expiration_at?: string;
    };
}

export {};
