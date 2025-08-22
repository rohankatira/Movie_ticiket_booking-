import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../assets/assets';
import Loading from '../components/Loading';
import BlurCircle from '../components/BlurCircle';
import timeFormat from '../lib/timeFormat';
import { dateFormat } from '../lib/dateFormat';

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  const formatCurrency = (amount) => {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
      }).format(amount);
    } catch {
      return currency + amount;
    }
  };

  const getDaysLeft = (date) => {
    const now = new Date();
    const showDate = new Date(date);
    const diff = showDate - now;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

      {bookings.map((item, index) => (
        <div
          key={`${item._id}-${index}`}
          className="flex flex-col md:flex-row justify-between rounded-lg mt-6 p-4 max-w-3xl mx-auto 
                     bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 shadow-md
                     transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={item.show?.movie?.poster_path || '/fallback.jpg'}
              alt={item.show?.movie?.title || 'Movie Poster'}
              className="md:w-48 w-full aspect-video object-contain bg-gray-100 rounded-lg"
            />
            <div className="flex flex-col justify-between p-2 md:p-4">
              <div>
                <p className="text-xl font-semibold mb-1">{item.show?.movie?.title || 'Untitled'}</p>
                <span className="inline-block bg-primary px-3 py-1 rounded-full text-xs font-medium mb-2">
                  {item.show?.movie?.genre || 'Genre'}
                </span>
                <p className="text-gray-400 text-base mb-2">{timeFormat(item.show?.movie?.runtime)}</p>
                <p className="text-gray-400 text-base">{dateFormat(item.show?.showDateTime)}</p>
              </div>
              <p className="text-xs text-primary font-semibold mt-2">
                {getDaysLeft(item.show?.showDateTime) > 0
                  ? `Starts in ${getDaysLeft(item.show?.showDateTime)} day${getDaysLeft(item.show?.showDateTime) > 1 ? 's' : ''}`
                  : 'Happening soon'}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-4 md:w-48">
            <div className="flex items-center justify-end gap-4 mb-4">
              <p className="text-3xl font-bold">{formatCurrency(item.amount)}</p>
              {item.isPaid ? (
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Paid
                </span>
              ) : (
                <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Pending
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <p className="mb-1">
                <span className="text-gray-400 font-medium">Total Tickets: </span>
                {item.bookedSeats.length}
              </p>
              <p>
                <span className="text-gray-400 font-medium">Seat Number: </span>
                {item.bookedSeats.join(', ')}
              </p>
            </div>
            {!item.isPaid && (
              <button className="mt-6 bg-primary px-5 py-2 text-sm rounded-full font-semibold cursor-pointer hover:bg-primary/90 transition">
                Pay Now
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
