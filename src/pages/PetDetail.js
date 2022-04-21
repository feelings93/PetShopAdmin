import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getPet } from '../lib/api/pet';
import { getPetTypes } from '../lib/api/pet-type';
import { getBreeds } from '../lib/api/breed';
import PetDetailCard from '../components/pet-detail/PetDetailCard';

const PetDetail = () => {
  const params = useParams();
  const { sendRequest, status, data, error } = useHttp(getPet, true);
  const {
    data: dataPetTypes,
    error: errorPetTypes,
    sendRequest: sendPetTypes,
    status: statusPetTypes,
  } = useHttp(getPetTypes, true);
  const {
    data: dataBreeds,
    error: errorBreeds,
    sendRequest: sendBreeds,
    status: statusBreeds,
  } = useHttp(getBreeds, true);
  useEffect(() => {
    sendRequest(params.id);
    sendPetTypes();
    sendBreeds();
  }, [params.id, sendBreeds, sendPetTypes, sendRequest]);
  if (
    status === 'pending' ||
    statusPetTypes === 'pending' ||
    statusBreeds === 'pending'
  )
    return <h1>Loading</h1>;
  if (
    !data ||
    error ||
    !dataPetTypes ||
    errorPetTypes ||
    !dataBreeds ||
    errorBreeds
  )
    return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <PetDetailCard
      pet={data}
      petTypes={dataPetTypes}
      allBreeds={dataBreeds}
    />
  );
};

export default PetDetail;
