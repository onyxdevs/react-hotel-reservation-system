import axios from 'lib/scripts/axios';

const apis = {
    getHotels: async (): Promise<any> => {
        const response = await axios.get('/hotels');
        return response.data;
    },
    getHotelsDetails: async (): Promise<any> => {
        const response = await axios.get('/hotel-details');
        return response.data;
    },

    checkCoupon: async (coupon: string): Promise<any> => {
        const response = await axios.get(`/coupons?code=${coupon}`);
        return response.data;
    },
    newReservation: async (data: TypeNewReservation): Promise<TypeNewReservation> => {
        const response = await axios.post('/hotel-bookings', data);
        return response.data;
    },
    updateReservation: async (data: TypeNewReservation, reservationId: string): Promise<TypeNewReservation> => {
        const response = await axios.patch(`/hotel-bookings/${reservationId}`, data, { withCredentials: true });
        return response.data;
    },
    deleteReservation: async (reservationId: string): Promise<TypeNewReservation> => {
        const response = await axios.delete(`/hotel-bookings/${reservationId}`);
        return response.data;
    }
};

export default apis;
