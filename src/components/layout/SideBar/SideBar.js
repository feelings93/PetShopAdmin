import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import { SIDEBAR_WIDTH } from '../../constants';
import Logo from './Logo';
import TabList from './TabList';

const SideBar = (props) => {
  const { mobileOpen, handleDrawerToggle } = props;
  const drawer = (
    <Stack>
      <Stack mb={4} spacing={2}>
        <Logo />
        <TabList />
      </Stack>
    </Stack>
  );
  return (
    <Box
      component='nav'
      sx={{
        width: { sm: SIDEBAR_WIDTH },
        flexShrink: { sm: 0 },
      }}
      aria-label='mailbox folders'
    >
      <Drawer
        variant='temporary'
        onClose={handleDrawerToggle}
        open={mobileOpen}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
            px: 2,
            pt: 4,
            background: '#2D333F',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { sm: 'block', xs: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
            p: 2,
            pt: 4,
            boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px',
            border: 'none',
            background: '#2D333F'
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

SideBar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};
export default SideBar;
