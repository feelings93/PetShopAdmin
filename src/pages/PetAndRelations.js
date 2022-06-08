import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Pet from './Pet';
import PetContextProvider from '../store/pet-context';
import PetTypeContextProvider from '../store/pet-type-context';
import PetType from './PetType';
import BreedContextProvider from '../store/breed-context';
import Breed from './Breed';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const PetAndRelations = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Thú cưng' {...a11yProps(0)} />
          <Tab label='Loại thú cưng' {...a11yProps(1)} />
          <Tab label='Giống' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PetContextProvider>
          <Pet />
        </PetContextProvider>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PetTypeContextProvider>
          <PetType />
        </PetTypeContextProvider>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BreedContextProvider>
          <Breed />
        </BreedContextProvider>
      </TabPanel>
    </Box>
  );
};

export default PetAndRelations;
