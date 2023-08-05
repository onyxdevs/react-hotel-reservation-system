// import axios from 'lib/scripts/axios';

// Mocked data
import hotels from "./_api/hotels.json";
import hotelsDetails from "./_api/hotels-details.json";
import coupon20 from "./_api/coupons-CODE20.json";
import hotelBookings from "./_api/hotel-bookings.json";

const apis = {
  getHotels: async (): Promise<any> => {
    // const response = await axios.get('/hotels');
    // return response.data;
    return hotels;
  },
  getHotelsDetails: async (): Promise<any> => {
    // const response = await axios.get('/hotel-details');
    // return response.data;
    return hotelsDetails;
  },

  checkCoupon: async (coupon: string): Promise<any> => {
    // const response = await axios.get(`/coupons?code=${coupon}`);
    // return response.data;
    return coupon20;
  },
  newReservation: async (
    data: TypeNewReservation
  ): Promise<TypeNewReservation> => {
    // const response = await axios.post('/hotel-bookings', data);
    // return response.data;
    return hotelBookings[0];
  },
  updateReservation: async (
    data: TypeNewReservation,
    reservationId: string
  ): Promise<TypeNewReservation> => {
    // const response = await axios.patch(`/hotel-bookings/${reservationId}`, data, { withCredentials: true });
    // return response.data;
    return hotelBookings[0];
  },
  deleteReservation: async (
    reservationId: string
  ): Promise<TypeNewReservation> => {
    // const response = await axios.delete(`/hotel-bookings/${reservationId}`);
    // return response.data;
    return hotelBookings[0];
  },
};

export default apis;
