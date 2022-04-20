import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Add, Delete } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const Input = styled('input')({
  display: 'none',
});

const ProductDetailImages = ({ images, onAdd, onDelete, edit }) => {
  const handleAddFiles = async (event) => {
    try {
      const urls = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const url = URL.createObjectURL(event.target.files[i]);
        urls.push(url);
        console.log(urls);
      }

      onAdd(event.target.files, urls);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid spacing={1} container>
      <Grid item xs={12}>
        {images.length > 0 ? (
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              boxShadow: '0px 8px 16px rgb(58 163 204 / 18%)',
              width: '100%',
              height: '300px',

              backgroundImage: `url(${images[0]})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Chip sx={{ borderRadius: 1 }} size='small' label='Ảnh chính' />
          </Box>
        ) : (
          <Card
            sx={{
              width: '100%',
              height: '300px',
              backgroundColor: '#f4f6f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            variant='outlined'
          >
            <Typography variant='body2'>Không có hình ảnh</Typography>
          </Card>
        )}
      </Grid>

      {images.map((x, index) => {
        return (
          <Grid key={x} item xs={4}>
            <Box
              sx={{
                overflow: 'hidden',
                borderRadius: 1,
                boxShadow: '0px 8px 16px rgb(58 163 204 / 18%)',
                width: '100%',
                height: `${edit ? '130px' : '100px'}`,
              }}
            >
              {edit && (
                <IconButton onClick={onDelete.bind(null, index)}>
                  <Delete />
                </IconButton>
              )}
              <img
                style={{ objectFit: 'cover' }}
                src={x}
                width='100%'
                height='100%'
                alt='image product'
              />
            </Box>
          </Grid>
        );
      })}
      {edit && (
        <Grid item xs={4}>
          <label htmlFor='icon-button-file'>
            <Input
              sx={{ display: 'none' }}
              accept='.jpg, .png'
              multiple
              id='icon-button-file'
              type='file'
              onChange={handleAddFiles}
            />
            <IconButton
              component='span'
              sx={{
                backgroundColor: blue[50],
                width: '100px',
                height: '130px',
                borderRadius: 1,
              }}
            >
              <Add />
            </IconButton>
          </label>
        </Grid>
      )}
    </Grid>
  );
};

ProductDetailImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape()),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  edit: PropTypes.bool,
};

export default ProductDetailImages;
