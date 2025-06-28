"use client"
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Forum,
  Email,
  Phone,
  LocationOn,
  Send,
  Videocam,
  LiveTv,
  SportsEsports,
} from "@mui/icons-material"

export default function StreamixFooter() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  const footerLinks = {
    platform: [
      { name: "Browse Streams", href: "#" },
      { name: "Categories", href: "#" },
      { name: "Top Streamers", href: "#" },
      { name: "Esports", href: "#" },
    ],
    creators: [
      { name: "Start Streaming", href: "#" },
      { name: "Creator Dashboard", href: "#" },
      { name: "Monetization", href: "#" },
      { name: "Stream Tools", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Community Guidelines", href: "#" },
      { name: "Report Content", href: "#" },
      { name: "Contact Support", href: "#" },
    ],
  }

  const socialLinks = [
    { name: "Twitter", icon: <Twitter />, href: "#", color: "#1DA1F2" },
    { name: "Instagram", icon: <Instagram />, href: "#", color: "#E4405F" },
    { name: "YouTube", icon: <YouTube />, href: "#", color: "#FF0000" },
    { name: "Community", icon: <Forum />, href: "#", color: "#5865F2" },
    { name: "Facebook", icon: <Facebook />, href: "#", color: "#1877F2" },
  ]

  const contactInfo = [
    { icon: <Email />, text: "support@streamix.com", href: "mailto:support@streamix.com" },
    { icon: <Phone />, text: "+1 (964) STREAM-X", href: "tel:+15557873269" },
    { icon: <LocationOn />, text: "Iraq Baghdad, Iq", href: "#" },
  ]

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1a0d2e 0%, #16213e 50%, #0f3460 100%)",
        color: "white",
        pt: { xs: 4, md: 6 },
        pb: 2,
        mt: "auto",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)
          `,
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Company Info Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              {/* Logo and Brand */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#9333ea",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <LiveTv sx={{ color: "white", fontSize: 24 }} />
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #9333ea 30%, #a855f7 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Streamix
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: "#c4b5fd",
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                The ultimate live streaming platform where creators connect with their communities. Stream games, chat
                with viewers, and build your audience on Streamix.
              </Typography>

              {/* Social Media Links */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.name}
                    href={social.href}
                    sx={{
                      color: "#c4b5fd",
                      backgroundColor: "rgba(147, 51, 234, 0.1)",
                      "&:hover": {
                        color: social.color,
                        backgroundColor: "rgba(147, 51, 234, 0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Links Sections */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {/* Platform Links */}
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "#a855f7",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Videocam sx={{ fontSize: 20 }} />
                  Platform
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {footerLinks.platform.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      sx={{
                        color: "#c4b5fd",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        "&:hover": {
                          color: "#a855f7",
                          textDecoration: "underline",
                        },
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              </Grid>

              {/* Creators Links */}
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "#a855f7",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <SportsEsports sx={{ fontSize: 20 }} />
                  Creators
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {footerLinks.creators.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      sx={{
                        color: "#c4b5fd",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        "&:hover": {
                          color: "#a855f7",
                          textDecoration: "underline",
                        },
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              </Grid>

              {/* Support Links */}
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "#a855f7",
                  }}
                >
                  Support
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {footerLinks.support.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      sx={{
                        color: "#c4b5fd",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        "&:hover": {
                          color: "#a855f7",
                          textDecoration: "underline",
                        },
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Newsletter & Contact Section */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#a855f7",
              }}
            >
              Stay Connected
            </Typography>

            {/* Newsletter Signup */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#c4b5fd",
                  mb: 2,
                }}
              >
                Get updates on new features and top streamers.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter your email"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(147, 51, 234, 0.1)",
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(168, 85, 247, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(168, 85, 247, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#a855f7",
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#c4b5fd",
                      opacity: 1,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  sx={{
                    background: "linear-gradient(45deg, #9333ea 30%, #a855f7 90%)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #7c3aed 30%, #9333ea 90%)",
                      transform: "translateY(-1px)",
                    },
                    textTransform: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>

            {/* Contact Info */}
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#a855f7",
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Contact Info
              </Typography>
              {contactInfo.map((contact, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Box sx={{ color: "#a855f7", fontSize: 16 }}>{contact.icon}</Box>
                  <Link
                    href={contact.href}
                    sx={{
                      color: "#c4b5fd",
                      textDecoration: "none",
                      fontSize: "0.75rem",
                      "&:hover": {
                        color: "#a855f7",
                      },
                      transition: "color 0.3s ease",
                    }}
                  >
                    {contact.text}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 3, backgroundColor: "rgba(168, 85, 247, 0.2)" }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#c4b5fd",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            © 2024 Streamix. All rights reserved. Stream your passion.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            <Link
              href="#"
              sx={{
                color: "#c4b5fd",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  color: "#a855f7",
                },
                transition: "color 0.3s ease",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              sx={{
                color: "#c4b5fd",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  color: "#a855f7",
                },
                transition: "color 0.3s ease",
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              sx={{
                color: "#c4b5fd",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  color: "#a855f7",
                },
                transition: "color 0.3s ease",
              }}
            >
              Community Guidelines
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
