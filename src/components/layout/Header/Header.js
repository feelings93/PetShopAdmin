import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { PersonOutlined, VpnKeyOutlined } from '@mui/icons-material';
import { SIDEBAR_WIDTH } from '../../constants';
import { AuthContext } from '../../../store/auth-context';
import EditProfileForm from '../../profile/EditProfileForm';
import EditPasswordForm from '../../profile/EditPasswordForm';

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditProfileDialogVisible, setIsEditProfileDialogVisible] =
    React.useState(false);
  const [isEditPasswordDialogVisible, setIsEditPasswordDialogVisible] =
    React.useState(false);
  const { handleDrawerToggle } = props;
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const showEditPasswordHandler = () => {
    setIsEditPasswordDialogVisible(true);
  };
  const hideEditPasswordHandler = () => {
    setIsEditPasswordDialogVisible(false);
  };
  const showEditProfileHandler = () => {
    setIsEditProfileDialogVisible(true);
  };
  const hideEditProfileHandler = () => {
    setIsEditProfileDialogVisible(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: 'rgb(250, 251, 251)',
        boxShadow: 'none',
        width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { sm: `${SIDEBAR_WIDTH}px` },
      }}
    >
      <Toolbar sx={{ color: 'rgb(148, 157, 178)' }}>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        <Avatar
          sx={{ ml: 'auto', padding: 0, cursor: 'pointer' }}
          aria-describedby={id}
          onClick={handleClick}
          src={
            user?.avatarUrl ||
            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          }
        />

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              p: 2,
              pr: 6,
              pl: 6,
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 90,
                height: 90,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Stack spacing={2}>
            <Typography variant='h6'>C?? nh??n</Typography>
            <Stack mt={2} direction='row'>
              <Avatar
                src={
                  user?.avatarUrl ||
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
              />{' '}
              <Stack direction='column' sx={{ minWidth: '200px' }}>
                <Typography variant='h6'>
                  {user?.lastName + ' ' + user?.firstName}
                </Typography>
                <Typography variant='subtitle1' color='text.secondary'>
                  {user?.role}
                </Typography>
                <Typography variant='subtitle2' color='text.secondary'>
                  {user?.email}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack
              sx={{
                cursor: 'pointer',
                '&:hover': { background: 'rgba(0, 0, 0, 0.03)' },
                borderRadius: '4',
              }}
              spacing={2}
              mt={2}
              pl={2}
              pr={2}
              direction='row'
              alignItems='center'
              onClick={showEditProfileHandler}
            >
              <Box
                sx={{
                  background: '#E6F4FF',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  minWidth: '45px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PersonOutlined />
              </Box>

              <Stack
                direction='column'
                sx={{
                  minWidth: '200px',
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>
                  Th??ng tin c???a t??i
                </Typography>
                <Typography variant='subtitle1' color='text.secondary'>
                  Ch???nh s???a th??ng tin
                </Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                cursor: 'pointer',
                '&:hover': { background: 'rgba(0, 0, 0, 0.03)' },
                borderRadius: '4',
              }}
              spacing={2}
              mt={2}
              pl={2}
              pr={2}
              direction='row'
              alignItems='center'
              onClick={showEditPasswordHandler}
            >
              <Box
                sx={{
                  background: '#E6F4FF',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  minWidth: '45px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VpnKeyOutlined />
              </Box>

              <Stack
                direction='column'
                sx={{
                  minWidth: '200px',
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>
                  B???o m???t
                </Typography>
                <Typography variant='subtitle1' color='text.secondary'>
                  Thay ?????i m???t kh???u
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Button
              mt={2}
              fullWidth
              variant='contained'
              onClick={() => {
                // sendRequest();
                localStorage.removeItem('accessToken');
                window.location.replace('/login');
              }}
            >
              ????ng xu???t
            </Button>
          </Stack>
        </Menu>
      </Toolbar>
      {isEditProfileDialogVisible && (
        <EditProfileForm
          editUser={user}
          open={isEditProfileDialogVisible}
          onClose={hideEditProfileHandler}
        />
      )}
      {isEditPasswordDialogVisible && (
        <EditPasswordForm
          editUser={user}
          open={isEditPasswordDialogVisible}
          onClose={hideEditPasswordHandler}
        />
      )}
    </AppBar>
  );
};
Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};
export default Header;
