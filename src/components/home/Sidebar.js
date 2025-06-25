"use client"

import { useState } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  Fab,
} from "@mui/material"
import {
  KeyboardArrowLeft as ArrowLeftIcon,
  FiberManualRecord as LiveIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material"

const liveChannels = [
  {
    id: "1",
    username: "lol_nemesis",
    game: "The Last of Us Part I",
    viewers: "3.9K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    username: "Nmplol",
    game: "Just Chatting",
    viewers: "9.7K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    username: "Thebausffs",
    game: "League of Legends",
    viewers: "16.2K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    username: "PGL_DOTA2EN2",
    game: "Dota 2",
    viewers: "8.1K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    username: "AuzioMF",
    game: "EA Sports FC 25",
    viewers: "2.3K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    username: "PGL_Dota2",
    game: "Dota 2",
    viewers: "18.6K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    username: "NickEh30",
    game: "Fortnite",
    viewers: "1.4K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    username: "Grimm",
    game: "VALORANT",
    viewers: "2K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    username: "Gorgc",
    game: "Dota 2",
    viewers: "7.7K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    username: "PirateSoftware",
    game: "Dune: Awakening",
    viewers: "8K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const viewersAlsoWatch = [
  {
    id: "11",
    username: "ESL_DOTA2",
    game: "Dota 2",
    viewers: "65",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "12",
    username: "gojgva",
    game: "Dota 2",
    viewers: "1.9K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "13",
    username: "w33haa",
    game: "Dota 2",
    viewers: "438",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const StreamerListItem = ({ streamer, isMobile = false }) => (
  <ListItem
    sx={{
      position:"relative",
      py: isMobile ? 1 : 0.2,
      px: isMobile ? 1.5 : 2,
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      },
      cursor: "pointer",
    }}
  >
    <ListItemAvatar>
      <Avatar
        src={streamer.avatar}
        alt={streamer.username}
        sx={{
          width: isMobile ? 45 : 40,
          height: isMobile ? 45 : 40,
        }}
      />
    </ListItemAvatar>
    <ListItemText
      primary={
        <Typography
          variant="body2"
          sx={{
            color: "white",
            fontWeight: 500,
            fontSize: isMobile ? "15px" : "14px",
          }}
        >
          {streamer.username}
        </Typography>
      }
      secondary={
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: isMobile ? "13px" : "12px",
          }}
        >
          {streamer.game}
        </Typography>
      }
      sx={{ mr: 1 }}
    />
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <LiveIcon
        sx={{
          color: "#ff4444",
          fontSize: isMobile ? "10px" : "8px",
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: "white",
          fontSize: isMobile ? "13px" : "12px",
          fontWeight: 500,
        }}
      >
        {streamer.viewers}
      </Typography>
    </Box>
  </ListItem>
)

const LiveChannelsContent = ({ isMobile = false, onClose }) => (
  <Box
    sx={{
      width: isMobile ? "100%" : 260,
      backgroundColor: "#1a1a1a",
      color: "white",
      borderRadius: isMobile ? 0 : 1,
      overflow: "hidden",
     
    }}
  >
    {/* Header */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: isMobile ? 1.5 : 2.7,
        backgroundColor: "#2a2a2a",
        paddingTop: isMobile ? "15px" : "10px",
        paddingBottom: isMobile ? "10px" : "0px",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "white",
          fontWeight: 600,
          fontSize: isMobile ? "14px" : "12px",
          letterSpacing: "0.5px",
        }}
      >
        LIVE CHANNELS
      </Typography>
      <IconButton
        size="small"
        onClick={isMobile ? onClose : undefined}
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {isMobile ? <CloseIcon fontSize="small" /> : <ArrowLeftIcon fontSize="small" />}
      </IconButton>
    </Box>

    {/* Live Channels List */}
    <Box
      sx={{
        maxHeight: isMobile ? "calc(100vh - 80px)" : "none",
        overflowY: isMobile ? "auto" : "visible",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#2a2a2a",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#555",
          borderRadius: "3px",
        },
      }}
    >
      <List sx={{ py: 0 }}>
        {liveChannels.map((streamer) => (
          <StreamerListItem key={streamer.id} streamer={streamer} isMobile={isMobile} />
        ))}
      </List>

      {/* Viewers Also Watch Section */}
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            fontWeight: 600,
            fontSize: isMobile ? "13px" : "12px",
            letterSpacing: "0.5px",
            px: isMobile ? 1.5 : 2,
            py: isMobile ? 1.5 : 1,
            backgroundColor: "#2a2a2a",
          }}
        >
          PGL_DOTA2 VIEWERS ALSO WATCH
        </Typography>
        <List sx={{ py: 0 }}>
          {viewersAlsoWatch.map((streamer) => (
            <StreamerListItem key={streamer.id} streamer={streamer} isMobile={isMobile} />
          ))}
        </List>
      </Box>
    </Box>
  </Box>
)

export default function LiveChannelsComponent() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      {/* زر الإظهار للشاشات الصغيرة */}
      <Fab
      
        aria-label="show live channels"
        onClick={handleDrawerToggle}
        sx={{
          display: { xs: "flex", sm: "flex", md: "none" },
          position: "fixed",
           backgroundColor:"block",
           color:"white",
           background:"none",
          top: 5, // تغيير من bottom إلى top
          left: 20, // تغيير من right إلى left
       
          "&:hover": {
            backgroundColor: "#2a2a2a",
          },
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </Fab>

      {/* Drawer للشاشات الصغيرة */}
      <Drawer
        anchor="left" // تغيير من "right" إلى "left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: { xs: 280, sm: 320 }, // تصغير الحجم من 100% و 350 إلى 280 و 320
            backgroundColor: "#1a1a1a",
          },
        }}
      >
        <LiveChannelsContent isMobile={true} onClose={handleDrawerToggle} />
      </Drawer>

      {/* العرض العادي للشاشات الكبيرة */}
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        <LiveChannelsContent />
      </Box>
    </>
  )
}
