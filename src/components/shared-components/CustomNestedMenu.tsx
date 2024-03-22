import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Fade, Typography } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { makeStyles } from '@mui/styles';

type NestedMenuItemType = {
  iconSrc: string;
  title: string;
  href: string;
};
type CustomNestedMenuPropsType = {
  nestedMenuItems: NestedMenuItemType[];
  showDropdown: boolean;
  activeLink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
};

const useStyles = makeStyles(() => ({
  sidebar: {
    display: 'flex',
    alignItems: 'center',
    height: '49px',
    width: '100%',
    cursor: 'pointer',
    color: 'white'
  },
  typography: {
    fontFamily: 'Segoe UI',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '20px',
    textDecoration: 'none',
    color: 'grey',
    paddingLeft: '10px'
  },
  active: {
    background: 'linear-gradient(90deg, #127beb -97.5%, #85d1f5 100%)',
    color: '#ffffff'
  },
  activeIcon: {
    filter: 'invert(100%)'
  },
  activeTypography: {
    color: '#FFFFFF'
  }
}));

const CustomNestedMenu = ({
  nestedMenuItems,
  showDropdown,
  activeLink,
  setActiveLink
}: CustomNestedMenuPropsType) => {
  const classes = useStyles();

  const handleClick = (title: string) => {
    setActiveLink(title);
  };

  return (
    <Box
      sx={{
        background: 'white'
      }}
    >
      {nestedMenuItems.map((item, index) => (
        <Link key={index} href={item.href} passHref>
          <a
            className={`${classes.sidebar} ${
              activeLink === item.title ? classes.active : ''
            }`}
            onClick={() => handleClick(item.title)}
          >
            <Fade in={showDropdown} timeout={1000}>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  marginLeft: '25%'
                }}
              >
                <Image
                  src={item.iconSrc}
                  width={18}
                  height={16}
                  alt=""
                  className={`${
                    activeLink === item.title ? classes.activeIcon : ''
                  }`}
                />
                <Typography
                  className={`${classes.typography} ${
                    activeLink === item.title ? classes.activeTypography : ''
                  }`}
                  fontSize={'13px'}
                >
                  {item.title}
                </Typography>
              </div>
            </Fade>
          </a>
        </Link>
      ))}
    </Box>
  );
};

export default CustomNestedMenu;
