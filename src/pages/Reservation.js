import React, { useEffect } from 'react';
import ReservationGrid from '../components/reservation/ReservationGrid';
import LoadingBox from '../components/UI/LoadingBox';
import useHttp from '../hooks/use-http';
import { getReservations } from '../lib/api/reservation';

const Reservation = () => {
  const { sendRequest, data, error, status } = useHttp(getReservations);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') return <LoadingBox />;
  if (error) return <h1>{error}</h1>;
  return <ReservationGrid reservations={data} />;
};

export default Reservation;
