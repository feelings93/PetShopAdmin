import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import AddBreedForm from '../components/breed/AddBreedForm';
import useHttp from '../hooks/use-http';
import BreedGrid from '../components/breed/BreedGrid';
import EditBreedForm from '../components/breed/EditBreedForm';
import { getBreeds } from '../lib/api/breed';
import { BreedContext } from '../store/breed-context';

const Breed = () => {
  const { data, error, status, sendRequest } = useHttp(getBreeds, true);
  const breedCtx = useContext(BreedContext);
  const { setBreeds, openAdd, openEdit, handleOpenAdd, query, setQuery } =
    breedCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setBreeds(data);
    }
  }, [data, status, setBreeds]);

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
        <Typography>Giống</Typography>
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
      <BreedGrid />

      {openAdd && <AddBreedForm />}
      {openEdit && <EditBreedForm />}
    </>
  );
};

export default Breed;
