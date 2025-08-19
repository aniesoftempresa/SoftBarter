import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: '', message: '' })

    try {
      const response = await fetch('http://localhost:5163/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail })
      })

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Successfully subscribed to newsletter!' 
        })
        setNewsletterEmail('')
      } else {
        const errorData = await response.json()
        setSubmitStatus({ 
          type: 'error', 
          message: errorData.message || 'Failed to subscribe. Please try again.' 
        })
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please try again later.' 
      })
    } finally {
      setIsSubmitting(false)
      setSnackbarOpen(true)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        mt: 8,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SwapHorizIcon sx={{ fontSize: 32, mr: 1.5 }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                SoftBarter
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Transform the way you exchange goods and services through our 
              community-driven barter marketplace. Sustainable, secure, and social.
            </Typography>
            
            {/* Social Media Links */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  color="inherit" 
                  sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                How It Works
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Safety Guidelines
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Community Rules
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Terms of Service
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Privacy Policy
              </Typography>
            </Box>
          </Grid>

          {/* Newsletter Signup */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Subscribe to our newsletter for the latest updates, tips, and community news.
            </Typography>
            
            <Box component="form" onSubmit={handleNewsletterSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                type="email"
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255,255,255,0.7)',
                      opacity: 1,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={16} /> : <EmailIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                  },
                }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 SoftBarter. All rights reserved. Built with ❤️ for the community.
          </Typography>
        </Box>
      </Container>

      {/* Snackbar for newsletter subscription feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={submitStatus.type === 'success' ? 'success' : 'error'}
          variant="filled"
        >
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Footer