import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import { useLocation } from 'react-router-dom';
import { Link } from '../Link';

const categories = [
  {
    id: 'Diagnostic',
    children: [
      {
        id: 'Entries',
        icon: <PeopleIcon />,
        link: '/entries',
      },
      { id: 'Variables', icon: <DnsRoundedIcon />, link: '/variables' },
      { id: 'Diagnoses', icon: <AssignmentIcon />, link: '/diagnoses' },
      { id: 'Rules (Knowledge Base)', icon: <SettingsEthernetIcon />, link: '/rules' },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const location = useLocation()

  return (
    <div style={{ display: 'flex' }}>
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
            Expert System
          </ListItem>
          <ListItemButton selected={location.pathname === '/'}
                          sx={{ ...item, ...itemCategory }} component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Project Overview</ListItemText>
          </ListItemButton>
          {categories.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: '#101F33' }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, link }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton selected={location.pathname.startsWith(link)} sx={item} component={Link} to={link}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
