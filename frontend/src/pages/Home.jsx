import React from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import GroupIcon from '@mui/icons-material/Group'
import RecyclingIcon from '@mui/icons-material/Recycling'

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          py: 6,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          color: 'white',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to SoftBarter
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
          Your Digital Barter Marketplace
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Transform the way you exchange goods and services. SoftBarter connects people 
          who want to trade without the need for traditional currency.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 4 }}>
        How SoftBarter Works
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent sx={{ p: 3 }}>
              <SwapHorizIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Easy Trading
              </Typography>
              <Typography variant="body2" color="text.secondary">
                List items you want to trade and find what you need from other users. 
                Our platform makes bartering simple and secure.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent sx={{ p: 3 }}>
              <GroupIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Community Driven
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join a community of like-minded individuals who believe in the power 
                of sharing and sustainable consumption.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent sx={{ p: 3 }}>
              <RecyclingIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Eco-Friendly
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reduce waste and environmental impact by giving items a second life 
                through our barter marketplace.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home