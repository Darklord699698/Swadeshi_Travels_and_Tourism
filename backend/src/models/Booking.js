export const createBookingObject = (data) => {
  return {
    orderId: data.orderId,
    fullName: data.fullName,
    // NEW: You must add these lines so the blueprint allows the data through
    age: data.age,
    state: data.state,
    city: data.city,
    pincode: data.pincode,
    additionalTravelers: data.additionalTravelers, 
    // Existing fields
    tripName: data.tripName,
    total: data.total,
    travelDate: data.travelDate,
    userEmail: data.userEmail,
    phone: data.phone,
    breakdown: data.breakdown
  };
};