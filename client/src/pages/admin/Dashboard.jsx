import { ChartLineIcon, PlayCircleIcon, UsersIcon } from 'lucide-react';
import { MdCurrencyRupee } from 'react-icons/md'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';

const Dashboard = () => {

    const currency = import.meta.env.VITE_CURRENCY

    const[dashboardData, setDashboardData] = useState({
        totalBookings:0,
        totalRevenue:0,
        activeShows:[],
        totalUser:0
    });
    const [loading, setLoading] = useState(true);

    const dashboardCards = [
  { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
  { title: "Total Revenue", value: `${currency}${dashboardData.totalRevenue?.toLocaleString() || "0"}`, icon: MdCurrencyRupee },
  { title: "Active Shows", value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon },
  { title: "Total Users", value: dashboardData.totalUser || "0", icon: UsersIcon }
]
const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
    setLoading(false)
};

useEffect(() => {
    fetchDashboardData();
},[]);

  return !loading    (
    <div>
      
    </div>
  )
}

export default Dashboard
