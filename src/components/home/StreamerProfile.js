"use client"

import { useState } from "react"
import { Box, Typography, Button, Avatar, Chip, IconButton, Menu, MenuItem, Divider } from "@mui/material"
import { Favorite, Star, ExpandMore, People, Download, MoreVert, Verified } from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9146ff",
    },
    background: {
      default: "#0e0e10",
      paper: "#18181b",
    },
    text: {
      primary: "#efeff1",
      secondary: "#adadb8",
    },
  },
})

export default function StreamerProfile() {
  const [subscribeMenuAnchor, setSubscribeMenuAnchor] = useState(null)
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleSubscribeMenuOpen = (event) => {
    setSubscribeMenuAnchor(event.currentTarget)
  }

  const handleSubscribeMenuClose = () => {
    setSubscribeMenuAnchor(null)
  }

  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchor(event.currentTarget)
  }

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null)
  }

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
            left:"18%",

       
          width: "63%",
          maxWidth: 1200,
          bgcolor: "background.default",
          p: 3,
          position:"absolute",
          top:"80%",
            '@media (max-width:600px)': {
           position:"absolute",
          
          left:"-1%",
          top:"63%",
          }
        }}
      >
        {/* Main Profile Section */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
          {/* Avatar and Live Badge */}
          <Box sx={{ position: "relative" }}>
            <Avatar
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M3R6ykOoNqMF7r6CUTPZzmXTfAUCYW.png"
              alt="Thebausffs"
              sx={{
                width: 70,
                height: 70,
                border: "3px solid #ff0000",
              }}
            />
            <Chip
              label="LIVE"
              size="small"
              sx={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "#ff0000",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.7rem",
                height: 20,
              }}
            />
          </Box>

          {/* Stream Info */}
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: "bold",
                }}
              >
                Thebausffs
              </Typography>
              <Verified sx={{ color: "#9146ff", fontSize: 20 }} />
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                mb: 1,
                lineHeight: 1.4,
              }}
            >
              Well Well Well!... discussing the allegations that im the goat
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#9146ff",
                  fontWeight: "bold",
                }}
              >
                League of Legends
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                }}
              >
                English
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Favorite />}
              onClick={handleFollowClick}
              sx={{
                bgcolor: isFollowing ? "#00ff7f" : "#9146ff",
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: isFollowing ? "#00e06b" : "#7c3aed",
                },
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>

            <Button
              variant="outlined"
             
              endIcon={<ExpandMore />}
              onClick={handleSubscribeMenuOpen}
              sx={{
                borderColor: "text.secondary",
                color: "text.primary",
                textTransform: "none",
                fontWeight: "bold",
                width:"120px",
                "&:hover": {
                  borderColor: "#9146ff",
                  bgcolor: "rgba(145, 70, 255, 0.1)",
                  
                },
              }}
            >
              Subscribe
            </Button>

            <Menu
              anchorEl={subscribeMenuAnchor}
              open={Boolean(subscribeMenuAnchor)}
              onClose={handleSubscribeMenuClose}
              PaperProps={{
                sx: {
                  bgcolor: "background.paper",
                  border: "1px solid #2f2f35",
                },
              }}
            >
              <MenuItem  onClick={handleSubscribeMenuClose}>
                <Typography variant="body2">Tier 1 - $4.99</Typography>
              </MenuItem>
              <MenuItem onClick={handleSubscribeMenuClose}>
                <Typography variant="body2">Tier 2 - $9.99</Typography>
              </MenuItem>
              <MenuItem onClick={handleSubscribeMenuClose}>
                <Typography variant="body2">Tier 3 - $24.99</Typography>
              </MenuItem>
            </Menu>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
               
              
              </Box>

        
             
              <Menu
                anchorEl={moreMenuAnchor}
                open={Boolean(moreMenuAnchor)}
                onClose={handleMoreMenuClose}
                PaperProps={{
                  sx: {
                    bgcolor: "background.paper",
                    border: "1px solid #2f2f35",
                  },
                }}
              >
                <MenuItem onClick={handleMoreMenuClose}>
                  <Typography variant="body2">Report</Typography>
                </MenuItem>
                <MenuItem onClick={handleMoreMenuClose}>
                  <Typography variant="body2">Block</Typography>
                </MenuItem>
                <MenuItem onClick={handleMoreMenuClose}>
                  <Typography variant="body2">Share</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: "#2f2f35", mb: 3 }} />

        {/* About Section */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
                fontWeight: "bold",
              }}
            >
              About Thebausffs
            </Typography>
            <Verified sx={{ color: "#9146ff", fontSize: 18 }} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                mb: 0.5,
              }}
            >
              1.5M{" "}
              <Typography component="span" variant="body1" sx={{ color: "text.secondary", fontWeight: "normal" }}>
                followers
              </Typography>
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "text.primary",
            }}
          >
            Challenger Full AD Sion Otp
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
