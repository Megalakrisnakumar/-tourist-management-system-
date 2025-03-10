import AccBooking from "../models/AccomondationBooking.js";
import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";
import User from "../models/User.js";


function getWeeklyRevenue(bookings) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)
  endOfWeek.setHours(23, 59, 59, 999);
  const weeklyBookings = bookings.filter(booking => {
    console.log(booking.checkInDate);
    const checkInDate = new Date(booking.checkInDate);
    return checkInDate >= startOfWeek && checkInDate <= endOfWeek;
  });


  const weeklyRevenue = weeklyBookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  return weeklyRevenue;
}

export const GetAllDashbard = async (req, res) => {
  try {
    const bookings = await Booking.find()
    const accBooking = await (AccBooking.find())
    const usercount = (await User.find()).length
    const totalTourBookings = (bookings).length
    const totalAccomondationBookings = (accBooking).length
    const totaltourplaces = (await Tour.find()).length
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.TotalPrice, 0) + accBooking.reduce((acc, booking) => acc + booking.totalPrice, 0);//totalPrice
    const weeklyRevenue = getWeeklyRevenue(bookings) + getWeeklyRevenue(accBooking)
    const canceledbookings = (accBooking).filter(book => book.status === "cancelled").length

    const dashboardData = {
      userCount: usercount,
      totalTourBookings: totalTourBookings,
      totalAccommodationBookings: totalAccomondationBookings,
      totalTourPlaces: totaltourplaces,
      totalRevenue: totalRevenue,
      weeklyRevenue: weeklyRevenue,
      canceledBookings: canceledbookings
    };

    console.log(dashboardData);

    res.status(200).json(dashboardData)

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve accommodations",
      error: err.message,
    });
  }
};