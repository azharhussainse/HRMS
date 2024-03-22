import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomNestedMenu from './shared-components/CustomNestedMenu';
import dashboard from '../../public/asset/dashboard.svg';
import employee from '../../public/asset/employee.svg';
import HR_admin from '../../public/asset/HR_admin.svg';
import account from '../../public/asset/account.svg';
import payroll from '../../public/asset/payroll.svg';
import reports from '../../public/asset/reports.svg';
import setting from '../../public/asset/setting.svg';
import Leaves from '../../public/asset/Leaves.svg';

type SidebarItem = {
  iconSrc: string;
  title: string;
  href?: string;
};

const sidebarItems: SidebarItem[] = [
  { iconSrc: dashboard, title: 'Dashboard', href: '/' },
  { iconSrc: HR_admin, title: 'HR Admin' },
  { iconSrc: employee, title: 'Employees', href: '/' },
  { iconSrc: account, title: 'Clients Attachment', href: '/' },
  { iconSrc: payroll, title: 'Billable/Non Billable', href: '/' },
  { iconSrc: reports, title: 'Reports', href: '/' },
  { iconSrc: setting, title: 'Settings', href: '/' }
];

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
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '20px',
    textDecoration: 'none',
    color: 'grey',
    paddingLeft: '10px'
  },
  icon: {
    fontFamily: 'Segoe UI',
    marginTop: '2px',
    alignSelf: 'center',
    fontWeight: 400,
    fontSize: '18px',
    textDecoration: 'none',
    justifySelf: 'center',
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

const SideBar: React.FC = () => {
  const classes = useStyles();
  const [activeLink, setActiveLink] = React.useState<string>('');
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const nestedMenuItems = [
    { iconSrc: employee, title: 'Employees info', href: '/employee-info' },
    { iconSrc: Leaves, title: 'Leaves', href: '/leaves' },
    {
      iconSrc: employee,
      title: 'Employee  Attendance',
      href: '/employee-attendance'
    },
    { iconSrc: reports, title: 'Document Records', href: '#' }
  ];

  const handleClick = (title: string) => {
    if (title === 'HR Admin') {
      setActiveLink(title);
      setShowDropdown(!showDropdown);
    } else {
      setActiveLink(title);
    }
  };

  return (
    <Box
      sx={{
        // width: '100%',
        height: '100%',
        paddingTop: '40px',
        background: 'white'
      }}
    >
      {sidebarItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.title === 'HR Admin' && (
            <Link href={item.href || '/'}>
              <a
                key={index}
                className={`${classes.sidebar} ${
                  activeLink === item.title ? classes.active : ''
                }`}
                onClick={() => handleClick(item.title)}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    padding: '2px',
                    flexGrow: 0.5,
                    marginLeft: '8%'
                  }}
                >
                  <Image
                    src={item.iconSrc}
                    width={22}
                    height={22}
                    alt=""
                    className={`${
                      activeLink === item.title ? classes.activeIcon : ''
                    }`}
                  />
                  <Typography
                    className={`${classes.typography} ${
                      activeLink === item.title ? classes.activeTypography : ''
                    }`}
                  >
                    {item.title}
                  </Typography>
                </div>
                <Box>
                  {showDropdown ? (
                    <ExpandMoreIcon
                      className={`${classes.icon} ${
                        activeLink === item.title
                          ? classes.activeTypography
                          : ''
                      }`}
                      fontSize="large"
                    />
                  ) : (
                    <ChevronRightIcon
                      className={`${classes.icon} ${
                        activeLink === item.title
                          ? classes.activeTypography
                          : ''
                      }`}
                      fontSize="large"
                    />
                  )}
                </Box>
              </a>
            </Link>
          )}
          {item.title === 'HR Admin' && showDropdown && (
            <CustomNestedMenu
              nestedMenuItems={nestedMenuItems}
              showDropdown={showDropdown}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          )}
          {item.title !== 'HR Admin' && (
            <Link href={item.href || '/'}>
              <a
                key={index}
                className={`${classes.sidebar} ${
                  activeLink === item.title ? classes.active : ''
                }`}
                onClick={() => handleClick(item.title)}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    padding: '5px',
                    marginLeft: '8%'
                  }}
                >
                  <Image
                    src={item.iconSrc}
                    width={22}
                    height={22}
                    alt=""
                    className={`${
                      activeLink === item.title ? classes.activeIcon : ''
                    }`}
                  />
                  <Typography
                    className={`${classes.typography} ${
                      activeLink === item.title ? classes.activeTypography : ''
                    }`}
                  >
                    {item.title}
                  </Typography>
                </div>
              </a>
            </Link>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default SideBar;
