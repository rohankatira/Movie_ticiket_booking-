import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon, DoorOpenIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormate'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]
  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const navigate = useNavigate()

  const seatCategories = {
    Economy: { rows: ["A", "B", "C"], price: 150, color: '#4ade80' },
    Premium: { rows: ["D", "E", "F", "G"], price: 300, color: '#60a5fa' },
    VIP: { rows: ["H", "I", "J"], price: 500, color: '#facc15' }
  }

  const getCategoryByRow = (row) => {
    for (const [cat, { rows }] of Object.entries(seatCategories)) {
      if (rows.includes(row)) return cat
    }
    return null
  }

  const getShow = async () => {
    const showObj = dummyShowsData.find(show => show._id === id)
    if (showObj) {
      setShow({
        movie: showObj,
        dateTime: dummyDateTimeData
      })
    }
  }

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      toast("Please select the time first")
      return
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      toast("You can only select 5 seats")
      return
    }
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    )
  }

  // Unique marker component for sides of middle block
  const UniqueMiddleMarker = () => (
    <div className='flex flex-col items-center justify-center w-4 mx-1 select-none'>
      <div className='w-1.5 h-14 bg-primary rounded mx-auto'></div>
      <div className='w-3 h-3 bg-primary rounded-full mt-1'></div>
    </div>
  )

  const renderSeats = (row, count = 17) => {
    const leftCount = 6
    const middleCount = 5
    const rightCount = 6
    const category = getCategoryByRow(row)
    const price = seatCategories[category]?.price || 0
    const color = seatCategories[category]?.color || '#ccc'

    return (
      <div key={row} className='flex items-center gap-2 mt-3 justify-center select-none'>
        {/* Left row label */}
        <div className='w-6 text-center text-xs font-semibold text-gray-400 tracking-wide'>
          {row}
        </div>

        {/* Left seats */}
        <div className='flex flex-wrap items-center justify-center gap-3'>
          {Array.from({ length: leftCount }, (_, i) => {
            const seatId = `${row}${i + 1}`
            const isSelected = selectedSeats.includes(seatId)
            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                aria-pressed={isSelected}
                title={`${seatId} - ${category} - ₹${price}`}
                className={`h-10 w-10 rounded-md border cursor-pointer transition transform duration-200 ease-in-out ${
                  isSelected
                    ? 'bg-primary text-white shadow-lg scale-110'
                    : 'bg-transparent hover:bg-primary/30 hover:scale-105'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                style={{ borderColor: color }}
                type='button'
              >
                {seatId}
              </button>
            )
          })}
        </div>

        {/* Unique marker left side of middle block */}
        <UniqueMiddleMarker />

        {/* Middle seats */}
        <div className='flex flex-wrap items-center justify-center gap-3'>
          {Array.from({ length: middleCount }, (_, i) => {
            const seatId = `${row}${i + 1 + leftCount}`
            const isSelected = selectedSeats.includes(seatId)
            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                aria-pressed={isSelected}
                title={`${seatId} - ${category} - ₹${price}`}
                className={`h-10 w-10 rounded-md border cursor-pointer transition transform duration-200 ease-in-out ${
                  isSelected
                    ? 'bg-primary text-white shadow-lg scale-110'
                    : 'bg-transparent hover:bg-primary/30 hover:scale-105'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                style={{ borderColor: color }}
                type='button'
              >
                {seatId}
              </button>
            )
          })}
        </div>

        {/* Unique marker right side of middle block */}
        <UniqueMiddleMarker />

        {/* Right seats */}
        <div className='flex flex-wrap items-center justify-center gap-3'>
          {Array.from({ length: rightCount }, (_, i) => {
            const seatId = `${row}${i + 1 + leftCount + middleCount}`
            const isSelected = selectedSeats.includes(seatId)
            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                aria-pressed={isSelected}
                title={`${seatId} - ${category} - ₹${price}`}
                className={`h-10 w-10 rounded-md border cursor-pointer transition transform duration-200 ease-in-out ${
                  isSelected
                    ? 'bg-primary text-white shadow-lg scale-110'
                    : 'bg-transparent hover:bg-primary/30 hover:scale-105'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                style={{ borderColor: color }}
                type='button'
              >
                {seatId}
              </button>
            )
          })}
        </div>

        {/* Right row label */}
        <div className='w-6 text-center text-xs font-semibold text-gray-400 tracking-wide'>
          {row}
        </div>
      </div>
    )
  }

  const getTotalPrice = () => {
    let total = 0
    selectedSeats.forEach(seatId => {
      const row = seatId.charAt(0)
      const cat = getCategoryByRow(row)
      if (cat) total += seatCategories[cat].price
    })
    return total
  }

  useEffect(() => {
    getShow()
  }, [id])

  if (!show || !show.dateTime || !show.dateTime[date]) {
    return <Loading />
  }

  const handleProceed = () => {
    if (!selectedTime) {
      toast("Please select the time before proceeding")
      return
    }
    if (selectedSeats.length === 0) {
      toast("Select at least one seat to proceed")
      return
    }
    navigate(`/checkout/${id}/${date}/${selectedTime}`, { state: { seats: selectedSeats } })
  }

  return (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 md:pt-20 gap-10'>
      {/* Available Timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 max-h-[500px] overflow-y-auto md:sticky md:top-20 shadow-lg'>
        <p className='text-lg font-semibold px-6 mb-6 select-none'>Available Timings</p>
        <div>
          {show.dateTime[date].map((item, idx) => (
            <div
              key={`${item.time}-${idx}`}
              onClick={() => setSelectedTime(item.time)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'
              }`}
              role='button'
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedTime(item.time)
              }}
              aria-pressed={selectedTime === item.time}
            >
              <ClockIcon className='w-4 h-4' />
              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-12'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='0' right='0' />
        <h1 className='text-3xl font-semibold mb-6 select-none'>Select Your Seat</h1>
        <img src={assets.screenImage} alt='screen' className='mb-4 max-w-full rounded-md shadow-md' />
        <p className='text-gray-400 text-sm mb-10 uppercase tracking-widest select-none'>Screen Side</p>

        <div className='flex flex-col items-center mt-2 text-xs text-gray-300 w-full max-w-[800px] space-y-4'>
          {groupRows.map((group, idx) => (
            <div key={idx} className='grid grid-cols-1 gap-y-3'>
              {group.map(row => renderSeats(row))}
            </div>
          ))}

          {/* Category legend */}
          <div className='flex gap-6 justify-center mt-6 text-white text-sm select-none'>
            {Object.entries(seatCategories).map(([cat, { price, color }]) => (
              <div key={cat} className='flex items-center gap-2'>
                <span
                  className='w-5 h-5 rounded-md border'
                  style={{ backgroundColor: color, borderColor: color }}
                ></span>
                <span>{cat} - ₹{price}</span>
              </div>
            ))}
          </div>

          {/* Exit gates row */}
          <div className='mt-8 flex justify-between w-full max-w-[800px] text-white text-sm font-semibold px-16 select-none'>
            <button 
              aria-label='Exit Gate 1' 
              className='flex items-center gap-2 bg-green-600 px-4 py-1 rounded shadow-md hover:bg-green-700 transition'
              type="button"
            >
              Exit Gate 1
            </button>
            <button 
              aria-label='Exit Gate 2' 
              className='flex items-center gap-2 bg-green-600 px-4 py-1 rounded shadow-md hover:bg-green-700 transition'
              type="button"
            >
              Exit Gate 2
            </button>
          </div>
        </div>

        {/* Selected seat count & total price */}
        <div className='mt-12 flex flex-col items-center gap-4'>
          <p className='text-white text-lg select-none'>
            {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected (max 5)
          </p>
          <p className='text-white font-semibold text-xl select-none'>
            Total Price: ₹{getTotalPrice()}
          </p>
          <button
            onClick={()=> navigate('/my-bookings')}
            className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={selectedSeats.length === 0 || !selectedTime}
            type='button'
          >
            Proceed to Checkout
            <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatLayout
