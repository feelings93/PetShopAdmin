import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PropTypes from 'prop-types';
const StandardImageList = ({ urls }) => {
  return (
    <ImageList
      sx={{ width: 500, height: Math.ceil(urls.length / 3) * 164 + 164 }}
      cols={Math.ceil(urls.length / 3) + 1}
      rowHeight={164}
    >
      {urls.map((item, index) => (
        <ImageListItem key={index}>
          <img src={item} alt='product-img' srcSet={item} loading='lazy' />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
StandardImageList.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default StandardImageList;
