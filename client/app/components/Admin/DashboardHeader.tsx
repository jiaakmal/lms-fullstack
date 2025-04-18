'use client';

import { useState } from 'react';
import { Popover, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ThemeSwitcher } from '../../utils/TheameSwitcher';

const DashboardHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <div className="flex items-center justify-end p-6   fixed top-2 right-0 ">
      {/* Left: Title */}

      {/* Right: Theme Switcher & Notifications */}
      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <IconButton onClick={handleNotificationClick} className="text-black dark:text-white">
          <Badge color="error" variant="dot">
            <NotificationsIcon className="text-black dark:text-white cursor-pointer"/>
          </Badge>
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className="w-72 bg-white dark:bg-slate-800 rounded-sm shadow-lg">
            <p className="p-3 font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-slate-700">
              Notifications
            </p>
            <ul className="text-sm">
              {['New user registered', 'New course added', 'Payment received'].map((text, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer text-gray-800 dark:text-white"
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default DashboardHeader;
