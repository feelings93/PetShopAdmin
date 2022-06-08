import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ProductContextProvider from '../store/product-context';
import Product from './Product';
import CategoryContextProvider from '../store/category-context';
import Category from './Category';
import SubCategoryContextProvider from '../store/sub-category';
import SubCategory from './SubCategory';

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
const ProductAndRelations = () => {
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
          <Tab label='Sản phẩm' {...a11yProps(0)} />
          <Tab label='Danh mục' {...a11yProps(1)} />
          <Tab label='Danh mục phụ' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProductContextProvider>
          <Product />
        </ProductContextProvider>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoryContextProvider>
          <Category />
        </CategoryContextProvider>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SubCategoryContextProvider>
          <SubCategory />
        </SubCategoryContextProvider>
      </TabPanel>
    </Box>
  );
};

export default ProductAndRelations;
