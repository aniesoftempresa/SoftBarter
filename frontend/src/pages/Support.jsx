import React from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import BugReportIcon from '@mui/icons-material/BugReport'
import FeedbackIcon from '@mui/icons-material/Feedback'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LaunchIcon from '@mui/icons-material/Launch'

const Support = () => {
  const supportCategories = [
    {
      icon: <HelpOutlineIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'General Help',
      description: 'Common questions and basic guidance for using SoftBarter',
      status: 'Available'
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Account Support',
      description: 'Help with account creation, login issues, and profile management',
      status: 'Coming Soon'
    },
    {
      icon: <BugReportIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Technical Issues',
      description: 'Report bugs, technical problems, and platform issues',
      status: 'Coming Soon'
    },
    {
      icon: <FeedbackIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Feature Requests',
      description: 'Suggest new features and improvements for the platform',
      status: 'Coming Soon'
    }
  ]

  const faqs = [
    {
      question: 'What is SoftBarter?',
      answer: 'SoftBarter is a digital marketplace that allows users to exchange goods and services without using traditional currency. It\'s based on the ancient practice of bartering, but enhanced with modern technology for convenience and security.'
    },
    {
      question: 'How does the bartering process work?',
      answer: 'Users create listings for items they want to trade, browse available items from other users, and propose exchanges. Our platform facilitates communication between trading partners and provides tools to ensure fair and secure transactions.'
    },
    {
      question: 'Is there a fee for using SoftBarter?',
      answer: 'SoftBarter is currently free to use. We believe in making bartering accessible to everyone and building a strong community before considering any premium features.'
    },
    {
      question: 'How do I ensure safe trading?',
      answer: 'While our full safety features are still being developed, we recommend meeting in public places for exchanges, verifying items before trading, and using our built-in communication system to maintain records of your negotiations.'
    },
    {
      question: 'What types of items can I trade?',
      answer: 'You can trade almost anything of value - physical goods, services, skills, and experiences. However, we prohibit illegal items, dangerous goods, and anything that violates our community guidelines.'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Support Center
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Get help, find answers, and connect with our support team. 
          We're here to make your SoftBarter experience smooth and enjoyable.
        </Typography>
      </Box>

      {/* Support Categories */}
      <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4 }}>
        Support Categories
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {supportCategories.map((category, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {category.icon}
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {category.title}
                    </Typography>
                    <Chip 
                      label={category.status}
                      color={category.status === 'Available' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {category.description}
                </Typography>
                <Button 
                  variant="outlined" 
                  disabled={category.status === 'Coming Soon'}
                  endIcon={<LaunchIcon />}
                >
                  {category.status === 'Available' ? 'Get Help' : 'Coming Soon'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQ Section */}
      <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4 }}>
        Frequently Asked Questions
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 6 }}>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* Contact Support */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Still Need Help?
        </Typography>
        <Typography variant="body1" paragraph>
          Can't find what you're looking for? Our comprehensive support system 
          is currently being developed to serve you better.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              mr: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Contact Support (Coming Soon)
          </Button>
          <Button 
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Community Forums (Coming Soon)
          </Button>
        </Box>
      </Paper>

      {/* Support Hours */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Support Hours
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monday - Friday: 9:00 AM - 6:00 PM EST<br />
          Weekend support coming soon
        </Typography>
      </Box>
    </Container>
  )
}

export default Support