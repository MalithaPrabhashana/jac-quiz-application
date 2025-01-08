import { useState, useEffect } from 'react';
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
import { useNavigate, useLocation } from 'react-router';
import classes from '../../styles/NavbarMinimal.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  role: string; // Role can be 'teacher' or 'student'
}

function NavbarLink({ icon: Icon, label, active, onClick, to }: NavbarLinkProps) {
  const navigate = useNavigate();
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

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const [active, setActive] = useState(0);

  // Define links for each role
  const teacherLinks = [
    { icon: IconGauge, label: 'Dashboard', to: '/teacher/dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Create Quiz', to: '/teacher/create-quiz' },
    { icon: IconUser, label: 'All Quizzes', to: '/teacher/view-all-quizzes' },
  ];

  const studentLinks = [
    { icon: IconGauge, label: 'Dashboard', to: '/student/dashboard' },
    { icon: IconCalendarStats, label: 'View Quizzes', to: '/student/quizzes' },
  ];

  // Determine links based on the role
  const links = role === 'teacher' ? teacherLinks : studentLinks;

  // Update active link based on current path
  useEffect(() => {
    const activeLink = links.findIndex((link) => link.to === location.pathname);
    setActive(activeLink >= 0 ? activeLink : 0);  // Default to first link if no match
  }, [location, links]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links.map((link, index) => (
            <NavbarLink
              {...link}
              key={link.label}
              active={index === active}
            />
          ))}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" to="/change-account" />
        <NavbarLink icon={IconLogout} label="Logout" to="/logout" />
      </Stack>
    </nav>
  );
}