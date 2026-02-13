// This acts as your data blueprint
export const createBookingObject = (data) => {
    return {
      orderId: data.orderId,
      fullName: data.fullName,
      tripName: data.tripName,
      total: data.total,
      travelDate: data.travelDate,
      userEmail: data.userEmail,
      phone: data.phone,
      breakdown: data.breakdown
    };
  };