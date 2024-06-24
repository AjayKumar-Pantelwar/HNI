import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { forwardRef } from 'react';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
// routes
import { RouterLink } from 'src/routes/components';
//
import InfoIcon from '@mui/icons-material/Info';
//
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { NavConfigProps, NavItemProps } from '../types';
import { StyledIcon, StyledItem } from './styles';
// ----------------------------------------------------------------------

type Props = NavItemProps & {
  config: NavConfigProps;
};

const NavItem = forwardRef<HTMLDivElement, Props>(
  ({ item, depth, open, active, externalLink, config, ...other }, ref) => {
    const { title, path, Icon, info, children, disabled, caption, roles } = item;

    const subItem = depth !== 1;

    const renderContent = (
      <StyledItem
        disableGutters
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        config={config}
        {...other}
      >
        {Icon && (
          <StyledIcon
            size={config.iconSize}
            sx={{
              ...(subItem && { mr: 1.5 }),
            }}
          >
            <Icon selectedColor="#1B1C1E" />
          </StyledIcon>
        )}

        {!(config.hiddenLabel && !subItem) && (
          <ListItemText
            sx={{
              ...(!subItem && {
                ml: 1,
              }),
            }}
            primary={title}
            primaryTypographyProps={{
              noWrap: true,
              typography: 'body2',
              textTransform: 'capitalize',
              fontWeight: active ? 'fontWeightBold' : 'fontWeightMedium',
              ...(subItem && {
                fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
              }),
            }}
          />
        )}

        {info && (
          <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
            {info}
          </Box>
        )}

        {caption && (
          <Tooltip title={caption} arrow>
            <InfoIcon width={16} sx={{ ml: 0.5, color: 'text.disabled' }} />
          </Tooltip>
        )}

        {/* {children && subItem ? (
          <ChevronRightIcon width={16} sx={{ flexShrink: 0, ml: 0.5 }} />
        ) : (
          children && <KeyboardArrowLeftIcon width={16} sx={{ flexShrink: 0, ml: 0.5 }} />
        )} */}
        {subItem ? (
          <ChevronRightIcon width={16} sx={{ flexShrink: 0, ml: 0.5 }} />
        ) : (
          <KeyboardArrowLeftIcon width={16} sx={{ flexShrink: 0, ml: 0.5 }} />
        )}
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
          sx={{
            ...(disabled && {
              cursor: 'default',
            }),
          }}
        >
          {renderContent}
        </Link>
      );

    // Default
    return (
      <Link
        component={RouterLink}
        href={path}
        underline="none"
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
);

export default NavItem;
