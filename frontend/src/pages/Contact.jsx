import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SendIcon from '@mui/icons-material/Send'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: '', message: '' })

    try {
      const response = await fetch('http://localhost:5163/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Message sent successfully! We\'ll get back to you soon.' 
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        const errorData = await response.json()
        setSubmitStatus({ 
          type: 'error', 
          message: errorData.message || 'Failed to send message. Please try again.' 
        })
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          We'd love to hear from you! Get in touch with our team for any questions, 
          suggestions, or partnership opportunities.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Get In Touch
          </Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  contact@softbarter.com
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Phone
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Office
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  123 Innovation Drive<br />
                  Tech City, TC 12345
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Send Us a Message
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Have a question, suggestion, or partnership opportunity? We'd love to hear from you!
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    placeholder="Tell us how we can help you..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                How do I start bartering?
              </Typography>
              <Typography variant="body2">
                Simply create an account, list items you want to trade, and browse 
                what others are offering. Our matching system will help you find 
                suitable trading partners.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Is SoftBarter free to use?
              </Typography>
              <Typography variant="body2">
                Yes! SoftBarter is completely free to use. We believe in making 
                bartering accessible to everyone in our community.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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
    </Container>
  )
}

export default Contact