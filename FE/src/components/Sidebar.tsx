import { useState } from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
} from '@tabler/icons-react';
import { Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { useNavigate } from 'react-router';
import classes from '../../styles/NavbarMinimal.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick, to }: NavbarLinkProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={handleClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', to: '/dashboard' },
  { icon: IconGauge, label: 'Dashboard', to: '/dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', to: '/analytics' },
  { icon: IconCalendarStats, label: 'Releases', to: '/releases' },
  { icon: IconUser, label: 'Account', to: '/account' },
  { icon: IconFingerprint, label: 'Security', to: '/security' },
  { icon: IconSettings, label: 'Settings', to: '/settings' },
];

export default function Sidebar() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)} // Change active tab on click
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" to="/change-account" />
        <NavbarLink icon={IconLogout} label="Logout" to="/logout" />
      </Stack>
    </nav>
  );
}