import React from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
  Avatar,
  Rating,
} from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import GroupIcon from '@mui/icons-material/Group'
import RecyclingIcon from '@mui/icons-material/Recycling'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SearchIcon from '@mui/icons-material/Search'
import HandshakeIcon from '@mui/icons-material/Handshake'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Home = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "S",
      rating: 5,
      comment: "SoftBarter helped me exchange my old furniture for art supplies. Amazing community!",
      trade: "Furniture ↔ Art Supplies"
    },
    {
      name: "Mike Chen",
      avatar: "M", 
      rating: 5,
      comment: "I traded my coding services for fresh vegetables from a local farm. Win-win!",
      trade: "Coding Services ↔ Vegetables"
    },
    {
      name: "Emma Davis",
      avatar: "E",
      rating: 4,
      comment: "Great platform for sustainable trading. Reduced my waste and got what I needed.",
      trade: "Books ↔ Electronics"
    }
  ]

  const steps = [
    {
      icon: <SearchIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: "1. Browse & List",
      description: "Browse available items or list what you want to trade"
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: "2. Connect & Negotiate", 
      description: "Connect with other users and negotiate fair exchanges"
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: "3. Complete Trade",
      description: "Meet up safely and complete your barter transaction"
    }
  ]
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
          Transform the Way You Exchange Goods & Services
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}>
          Join thousands of users who have discovered the power of bartering. Trade what you have 
          for what you need in a sustainable, community-driven marketplace.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Start Trading Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'white',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      {/* How It Works Section */}
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
        How SoftBarter Works
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center', '&:hover': { transform: 'translateY(-4px)' }, transition: 'transform 0.3s ease' }}>
              <CardContent sx={{ p: 4 }}>
                {step.icon}
                <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Features Section */}
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
        Why Choose SoftBarter?
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', '&:hover': { transform: 'translateY(-4px)' }, transition: 'transform 0.3s ease' }}>
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
          <Card sx={{ height: '100%', textAlign: 'center', '&:hover': { transform: 'translateY(-4px)' }, transition: 'transform 0.3s ease' }}>
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
          <Card sx={{ height: '100%', textAlign: 'center', '&:hover': { transform: 'translateY(-4px)' }, transition: 'transform 0.3s ease' }}>
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

      {/* Testimonials Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          What Our Users Say
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Real stories from our community members who have transformed 
          their trading experience with SoftBarter
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {testimonial.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6" component="h4">
                    {testimonial.name}
                  </Typography>
                  <Rating value={testimonial.rating} readOnly size="small" />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                "{testimonial.comment}"
              </Typography>
              <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>
                {testimonial.trade}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home