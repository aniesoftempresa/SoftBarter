import React from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import HandshakeIcon from '@mui/icons-material/Handshake'

const About = () => {
  const features = [
    'Connect users who want to exchange goods and services',
    'Eliminate the need for traditional currency in transactions',
    'Build sustainable communities through resource sharing',
    'Provide a secure platform for trust-based trading',
    'Reduce waste by giving items a second life',
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About SoftBarter
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Revolutionizing the way people exchange goods and services through 
          modern technology and community-driven values.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h4" component="h2">
                Our Mission
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              SoftBarter is dedicated to creating a world where resources are shared 
              efficiently and sustainably. We believe that everyone has something valuable 
              to offer, and our platform facilitates meaningful exchanges between community members.
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission goes beyond simple transactions—we're building a movement that 
              challenges traditional commerce by empowering individuals to trade directly 
              with one another, fostering human connections and environmental responsibility.
            </Typography>
            <Typography variant="body1">
              Through innovative technology and community-first values, we're creating 
              an ecosystem where bartering becomes accessible, secure, and rewarding for everyone.
            </Typography>
            <Typography variant="body1">
              By eliminating traditional monetary barriers, we enable people to access 
              goods and services based on mutual benefit and trust, fostering stronger 
              communities and reducing waste.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <HandshakeIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h4" component="h2">
                What We Do
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              SoftBarter provides a comprehensive digital marketplace where users can:
            </Typography>
            <List>
              {features.map((feature, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Vision Section */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 6, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto' }}>
            To build a global community where bartering becomes a mainstream alternative 
            to traditional commerce, promoting sustainability, equality, and human connection 
            in every exchange.
          </Typography>
        </Paper>
      </Box>

      {/* Technology Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Built With Modern Technology
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Frontend
              </Typography>
              <Typography variant="body1">
                React with Material-UI for a responsive and intuitive user experience
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Backend
              </Typography>
              <Typography variant="body1">
                ASP.NET Core for robust, scalable, and secure server-side operations
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default About