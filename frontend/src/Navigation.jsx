import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
    { text: 'Support', path: '/support' },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
        <SwapHorizIcon sx={{ fontSize: 28, mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          SoftBarter
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemText
              primary={
                <Button
                  component={Link}
                  to={item.path}
                  color={location.pathname === item.path ? 'primary' : 'inherit'}
                  sx={{ width: '100%' }}
                >
                  {item.text}
                </Button>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: 3 }}>
        <Toolbar>
          <Box 
            component={Link} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            <SwapHorizIcon sx={{ fontSize: 32, mr: 1.5 }} />
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              SoftBarter
            </Typography>
          </Box>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navigation