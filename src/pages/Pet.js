import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import AddPetForm from '../components/pet/AddPetForm';
import { getPets } from '../lib/api/pet';
import useHttp from '../hooks/use-http';
import PetGrid from '../components/pet/PetGrid';
import { PetContext } from '../store/pet-context';

const Pet = () => {
  const { data, error, status, sendRequest } = useHttp(getPets, true);
  const petCtx = useContext(PetContext);
  const { setPets, openAdd, handleOpenAdd, query, setQuery } = petCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setPets(data);
    }
  }, [data, status, setPets]);

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
        <Typography>Thú cưng</Typography>
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
      <PetGrid />
      {openAdd && <AddPetForm />}
    </>
  );
};

export default Pet;
