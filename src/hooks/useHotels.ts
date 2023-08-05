import { useSelector } from "react-redux";
import { getRoomDetails } from "../lib/scripts/utils";

const useHotels = () => {
  const hotelsNames = useSelector(
    (state: TypeAppProps) => state.hotels.data.names
  );
  const hotelsDetails = useSelector(
    (state: TypeAppProps) => state.hotels.data.details
  );
  const cart = useSelector((state: TypeCartDetails) => state.cart);
  const roomDetails = getRoomDetails(cart, hotelsDetails);
  const selectedHotel = hotelsNames.find(
    (hotel: TypeHotel) => hotel.id === cart.hotelId
  );

  let selectedHotelDetails: TypeHotelDetails | undefined;
  if (hotelsDetails) {
    selectedHotelDetails = hotelsDetails.find(
      (item) => item.id === cart.hotelId
    );
  }

  return {
    hotels: {
      names: hotelsNames || [],
      details: hotelsDetails || [],
    },
    roomDetails,
    selectedHotel: {
      name: selectedHotel?.hotel_name || "",
      details: selectedHotelDetails,
    },
  };
};

export default useHotels;
