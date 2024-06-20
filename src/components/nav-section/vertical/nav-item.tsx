'use client';

// @mui

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
// routes
import { RouterLink } from 'src/routes/components';
//
//
import { useTheme } from '@mui/material';
import { NavConfigProps, NavItemProps } from '../types';
import { StyledDotIcon, StyledIcon, StyledItem } from './styles';

// ----------------------------------------------------------------------

type Props = NavItemProps & {
  config: NavConfigProps;
};

export default function NavItem({
  item,
  open,
  depth,
  active,
  config,
  externalLink,
  ...other
}: Props) {
  const { title, path, Icon, info, children, disabled, caption, roles } = item;

  const subItem = depth !== 1;

  const { sx, ...rest } = other;

  const theme = useTheme();

  console.log({ subItem, children, active });

  const renderContent = (
    <StyledItem
      disableGutters
      disabled={disabled}
      active={active}
      depth={depth}
      config={config}
      sx={{
        gap: 2,
        borderRadius: 'unset',
        // borderRight: `solid 4px`,
        // borderColor: active ? 'primary.main' : 'transparent',
        '& svg path': {
          color: active ? 'primary.main' : 'inherit',
        },
        ...sx,
        ...(!children && {
          ':hover': {
            // borderColor: 'primary.main',
            color: 'primary.main',
            borderRadius: 'unset',
          },
        }),
        ...(children &&
          active && {
            borderRight: '4px solid',
            borderColor: 'primary.main',
            backgroundColor: '#FFF6F2',
            color: 'primary.main',
          }),
        ...(!children &&
          active && {
            color: 'primary.main',
          }),
        ...(!children &&
          active &&
          !subItem && {
            borderRight: '4px solid',
            borderColor: 'primary.main',
            backgroundColor: '#FFF6F2',
            color: 'primary.main',
          }),
      }}
      {...rest}
    >
      <>
        {Icon && <Icon />}

        {subItem && (
          <StyledIcon size={config.iconSize}>
            <StyledDotIcon active={active} />
          </StyledIcon>
        )}
      </>
      {!(config.hiddenLabel && !subItem) && (
        <ListItemText
          primary={title}
          secondary={
            caption ? (
              <Tooltip title={caption} placement="top-start">
                <span>{caption}</span>
              </Tooltip>
            ) : null
          }
          primaryTypographyProps={{
            noWrap: true,
            typography: 'body2',
            textTransform: 'capitalize',
            fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
            color: active ? 'primary.main' : 'text.primary',
          }}
          secondaryTypographyProps={{
            noWrap: true,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
          }}
        />
      )}
      {info && (
        <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
          {info}
        </Box>
      )}
      {!!children &&
        (open ? (
          <KeyboardArrowDownIcon
            width={16}
            sx={{ color: 'text.primary', flexShrink: 0, ml: 0.5 }}
          />
        ) : (
          <ChevronRightIcon width={16} sx={{ color: 'text.primary', flexShrink: 0, ml: 0.5 }} />
        ))}
    </StyledItem>
  );

  // Hidden item by role
  if (roles && !roles.includes(`${config.currentRole}`)) {
    return null;
  }

  // External link
  if (externalLink)
    return (
      <Link
        href={path}
        target="_blank"
        rel="noopener"
        underline="none"
        color="inherit"
        sx={{
          ...(disabled && {
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </Link>
    );

  // Has child
  if (children) {
    return renderContent;
  }

  // Default
  return (
    <Link
      component={RouterLink}
      href={path}
      underline="none"
      color="inherit"
      sx={{
        ...(disabled && {
          cursor: 'default',
        }),
      }}
    >
      {renderContent}
    </Link>
  );
}
