import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  styled,
  Typography,
  Avatar,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../public/asset/logo.png';
import alarm from '../../public/asset/alarm.svg';
import chat from '../../public/asset/chat.svg';
import { useCookies } from 'react-cookie';
import { useDialog } from '@/hooks/useDialog';
import ChangeUserPasswords from './ChangeUser-Passwords';
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none'
    },
    '&:hover fieldset': {
      border: 'none'
    }
  }
});

const ClientInfo = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '16px'
});

const ClientAvatar = styled(Avatar)({
  width: '32px',
  height: '32px',
  marginRight: '8px'
});
function NavBar() {
  const { data: session, status } = useSession();

  const [cookies, setCookie] = useCookies();

  React.useEffect(() => {
    setCookie('token', session?.user.token);
    setCookie('session', session?.expires);
  }, [session?.expires, session?.user.token, setCookie]);

  const {
    isDialogOpen: isChangeUserPasswordsDialogOpen,
    closeDialog: closeChangeUserPasswordsDialog,
    openDialog: openChangeUserPasswordsDialog
  } = useDialog();
  // console.log('session', session);
  const [userMenu, setUserMenu] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };

  return (
    <Box
      position="static"
      sx={{
        display: 'flex',
        width: '100%',
        // height: '100%',
        borderBottom: '1px solid #F5F6F9',
        background: '#FFFFFF'
      }}
    >
      <Box
        sx={{
          width: '17.40%',
          borderRight: '1px solid #F5F6F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image src={logo} width={150} height={72} alt="" />
      </Box>
      <Box sx={{ width: '82.60%', display: 'flex' }}>
        <Box
          sx={{
            width: '65%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <CustomTextField
            sx={{
              width: '60%',
              background: '#F5F6F9',
              marginLeft: '18px',
              fontFamily: 'Segoe UI',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px',
              // lineHeight: '19px',
              color: '#999898'
            }}
            type="search"
            placeholder="Search for employee/project"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box
          sx={{
            width: '7.50%',
            border: '1px solid #F5F6F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image src={alarm} width={21} height={23.99} alt="" />
        </Box>
        <Box
          sx={{
            width: '7.50%',
            border: '1px solid #F5F6F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image src={chat} width={21} height={23.99} alt="" />
        </Box>
        <Box
          sx={{
            width: '20%',
            border: '1px solid #F5F6F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box>
            <div style={{ flexGrow: 1 }} />
            <ClientInfo>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                  <ClientAvatar
                    src={`${session?.user?.userInfo?.profilePicture}`}
                    alt="Client DP"
                  />
                </IconButton>
              </Tooltip>
              <Typography variant="body2">
                {session?.user?.userInfo?.firstName}
              </Typography>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={userMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(userMenu)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => signOut()}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    textAlign="center"
                    onClick={openChangeUserPasswordsDialog}
                  >
                    Change User/Password
                  </Typography>
                  {isChangeUserPasswordsDialogOpen && (
                    <ChangeUserPasswords
                      isChangeUserPasswordsDialogOpen={
                        isChangeUserPasswordsDialogOpen
                      }
                      closeChangeUserPasswordsDialog={
                        closeChangeUserPasswordsDialog
                      }
                      openChangeUserPasswordsDialog={
                        openChangeUserPasswordsDialog
                      }
                    />
                  )}
                </MenuItem>
              </Menu>
            </ClientInfo>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NavBar;
