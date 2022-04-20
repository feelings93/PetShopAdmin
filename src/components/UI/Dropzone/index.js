import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PropTypes from 'prop-types';
import StandardImageList from '../StandardImageList';

const Input = styled('input')({
  display: 'none',
});

const DropzoneImage = ({ onChange }) => {
  const [urlLocal, setUrlLocal] = React.useState([]);

  const handleChangeFiles = async (event) => {
    try {
      const urls = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const url = await readUploadedFileAsURL(event.target.files[i]);
        urls.push(url);
      }

      onChange(event.target.files);
      setUrlLocal((prev) => [...prev, ...urls]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <label htmlFor='icon-button-file'>
      <Input
        accept='.jpg, .png'
        multiple
        id='icon-button-file'
        type='file'
        onChange={handleChangeFiles}
      />
      <IconButton color='primary' aria-label='upload picture' component='span'>
        <PhotoCamera />
      </IconButton>
      {urlLocal.length > 0 && <StandardImageList urls={urlLocal} />}
    </label>
  );
};
const readUploadedFileAsURL = (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

DropzoneImage.propTypes = {
  onChange: PropTypes.func,
};
export default DropzoneImage;
