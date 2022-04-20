import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import AddPetTypeForm from '../components/pet-type/AddPetTypeForm';
import useHttp from '../hooks/use-http';
import PetTypeGrid from '../components/pet-type/PetTypeGrid';
import EditPetTypeForm from '../components/pet-type/EditPetTypeForm';
import { PetTypeContext } from '../store/pet-type-context';
import { getPetTypes } from '../lib/api/pet-type';

const PetType = () => {
  const { data, error, status, sendRequest } = useHttp(getPetTypes, true);
  const petTypeCtx = useContext(PetTypeContext);
  const { setPetTypes, openAdd, openEdit, handleOpenAdd, query, setQuery } =
    petTypeCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setPetTypes(data);
    }
  }, [data, status, setPetTypes]);

  if (status === 'pending') return <h1>Loading...</h1>;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <>
      <Stack
        mb={2}
        justifyContent='space-between'
        alignItems='center'
        direction='row'
      >
        <Typography>Loại thú cưng</Typography>
        <Stack spacing={1} alignItems='center' direction='row'>
          <TextField
            size='small'
            id='search'
            label='Tìm kiếm'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleOpenAdd}
            sx={{ color: '#fff' }}
            variant='contained'
            color='success'
          >
            Thêm
          </Button>
        </Stack>
      </Stack>
      <PetTypeGrid />

      {openAdd && <AddPetTypeForm />}
      {openEdit && <EditPetTypeForm />}
    </>
  );
};

export default PetType;
