import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdMoreHoriz, MdOutlineFavorite } from 'react-icons/md';
import { Box, Typography } from '@mui/material';
import { PiPlayFill } from 'react-icons/pi';

import { CgPlayListAdd } from 'react-icons/cg';
import {BiSolidMusic } from 'react-icons/bi';


export default function BasicMenu() {
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        sx={{
         
          "&:hover": {
            backgroundColor: '#f6f6f600'
          },
        }}
      >
        <Box sx={{
          
          color: '#f7a456',
          "&:hover": {
            color: '#fa7b05'
          },
        }}>
          <MdMoreHoriz size={28} />
        </Box>


      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <PiPlayFill size={14} />
          <Typography variant='subtitle2' sx={{ ml: 1 }}>
            play
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <MdOutlineFavorite size={14} />
          <Typography variant='subtitle2' sx={{ ml: 1 }}>
            Like
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <CgPlayListAdd size={16} />
          <Typography variant='subtitle2' sx={{ ml: 1 }}>
            Add To Playlist
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <BiSolidMusic size={16} />
          <Typography variant='subtitle2' sx={{ ml: 1 }}>
            Music Page
          </Typography>
        </MenuItem>

      </Menu>
    </div>
  );
}
