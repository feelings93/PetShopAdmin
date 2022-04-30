import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServiceDetailCard from '../components/service-detail/ServiceDetailCard';
import useHttp from '../hooks/use-http';
import { getEmployees } from '../lib/api/employee';
import { getService } from '../lib/api/service';

const ServiceDetail = () => {
  const params = useParams();
  const { sendRequest, status, data, error } = useHttp(getService, true);
  const {
    data: dataEmployees,
    error: errorEmployees,
    sendRequest: sendEmployees,
    status: statusEmployees,
  } = useHttp(getEmployees, true);

  useEffect(() => {
    sendRequest(params.id);
    sendEmployees();
  }, [params.id, sendEmployees, sendRequest]);
  if (
    status === 'pending' ||
    statusEmployees === 'pending'
  )
    return <h1>Loading</h1>;
  if (
    !data ||
    error ||
    !dataEmployees ||
    errorEmployees 
  )
    return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <ServiceDetailCard
    service={data}
    employees={dataEmployees}
    />
  );
};

export default ServiceDetail;
