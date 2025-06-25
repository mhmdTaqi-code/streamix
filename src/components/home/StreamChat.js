"use client"

import { useState } from "react"
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  Chip,
  IconButton,
  Paper,
  InputAdornment,
} from "@mui/material"
import { People, Settings, Send, Close, MoreVert, EmojiEmotions, Star, Diamond, Verified } from "@mui/icons-material"
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

const chatMessages = [
  {
    id: 1,
    username: "rh____15",
    message: "LO",
    color: "#ff69b4",
    badge: "2",
  },
  {
    id: 2,
    username: "alined",
    message: "jungler from Temu",
    color: "#ffa500",
    isSubscriber: true,
  },
  {
    id: 3,
    username: "huskeruske",
    message: "pity leash",
    color: "#9146ff",
  },
  {
    id: 4,
    username: "ultim8m8",
    message: "playing against lucadenga unlucky",
    color: "#00bfff",
  },
  {
    id: 5,
    username: "ThunderingRoar",
    message: "velja on scuttle ...",
    color: "#32cd32",
    isReplying: true,
  },
  {
    id: 6,
    username: "PoorMans_Rose",
    message: "Velja take drag already GIGACHAD",
    color: "#ffd700",
  },
  {
    id: 7,
    username: "rhadookoo",
    message: "lscore",
    color: "#40e0d0",
  },
  {
    id: 8,
    username: "FeebleHero",
    message: "3:26",
    color: "#ff6347",
    hasEmote: true,
  },
  {
    id: 9,
    username: "StreamElements",
    message: "0-6",
    color: "#9146ff",
    isBot: true,
  },
  {
    id: 10,
    username: "Jeroenmon",
    message: "support taking pity on your slow clear",
    color: "#ff1493",
    hasEmote: true,
  },
  {
    id: 11,
    username: "Detox02",
    message: "3:26",
    color: "#ffa500",
    hasEmote: true,
  },
  {
    id: 12,
    username: "altopstra",
    message: "WORDLE",
    color: "#32cd32",
  },
  {
    id: 13,
    username: "fabren04",
    message: "Subscribed with Prime",
    color: "#9146ff",
    isSubscription: true,
  },
  {
    id: 14,
    username: "Mayuwushii",
    message: "3:30 is good tho",
    color: "#ff69b4",
  },
]
export default function StreamChat() {
  const [message, setMessage] = useState("")
  const [showEmoteNotification, setShowEmoteNotification] = useState(true)

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: 280,
          height: "93%",
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #2f2f35",
          position:"absolute",
          left:"82%",
          top:"7%",
          '@media (max-width:600px)': {
           position:"absolute",
          left:"130%",
          top:"1%",
          height:"1800px",
          }
           ,'@media (max-width:1024px-424px)': {
           position:"absolute",
          left:"72%",
          top:"4%",
          height:"1800px",
          }
          
        }}
      >
        {/* Header */}
        <AppBar position="static" sx={{ bgcolor: "#18181b" }}>
          <Toolbar sx={{ minHeight: "48px !important", px: 2 }}>
            <IconButton size="small" sx={{ color: "text.secondary", mr: 1 }}>
              <Settings fontSize="small" />
            </IconButton>
            <Typography variant="subtitle2" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
              STREAM CHAT
            </Typography>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <People fontSize="small" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, overflow: "auto", px: 1 }}>
          <List dense sx={{ py: 0 }}>
            {chatMessages.map((msg) => (
              <ListItem key={msg.id} sx={{ px: 1, py: 0.5, alignItems: "flex-start" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                  {msg.badge && (
                    <Chip
                      label={msg.badge}
                      size="small"
                      sx={{
                        bgcolor: "#ff69b4",
                        color: "white",
                        height: 16,
                        fontSize: "0.6rem",
                        mr: 0.5,
                        mt: 0.2,
                      }}
                    />
                  )}
                  {msg.isSubscriber && <Star sx={{ color: "#ffd700", fontSize: 14, mr: 0.5, mt: 0.2 }} />}
                  {msg.isBot && <Verified sx={{ color: "#9146ff", fontSize: 14, mr: 0.5, mt: 0.2 }} />}
                  {msg.hasEmote && <EmojiEmotions sx={{ color: "#ffd700", fontSize: 14, mr: 0.5, mt: 0.2 }} />}
                  {msg.isSubscription && <Diamond sx={{ color: "#9146ff", fontSize: 14, mr: 0.5, mt: 0.2 }} />}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{
                        color: msg.color,
                        fontWeight: "bold",
                        mr: 0.5,
                      }}
                    >
                      {msg.username}:
                    </Typography>
                    <Typography component="span" variant="caption" sx={{ color: "text.primary" }}>
                      {msg.message}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Emote Notification */}
        {showEmoteNotification && (
          <Paper
            sx={{
              m: 1,
              p: 1.5,
              bgcolor: "#9146ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Diamond sx={{ color: "white", mr: 1, fontSize: 20 }} />
              <Typography variant="caption" sx={{ color: "white" }}>
                Animated Emotes can be disabled in Settings
              </Typography>
            </Box>
            <Box>
              <Button
                size="small"
                sx={{
                  color: "black",
                  bgcolor: "white",
                  minWidth: "auto",
                  px: 1,
                  mr: 1,
                  "&:hover": { bgcolor: "#f0f0f0" },
                }}
              >
                Show me
              </Button>
              <IconButton size="small" sx={{ color: "white" }} onClick={() => setShowEmoteNotification(false)}>
                <Close fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        )}

        {/* Message Input */}
        <Box sx={{ p: 1, borderTop: "1px solid #2f2f35" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#2f2f35",
                "& fieldset": {
                  borderColor: "#2f2f35",
                },
                "&:hover fieldset": {
                  borderColor: "#9146ff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#9146ff",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleSendMessage}
                    sx={{ color: message.trim() ? "#9146ff" : "text.secondary" }}
                  >
                    <Send fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            borderTop: "1px solid #2f2f35",
            bgcolor: "#18181b",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Diamond sx={{ color: "#9146ff", fontSize: 16 }} />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                0
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <EmojiEmotions sx={{ color: "#ffd700", fontSize: 16 }} />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                0
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <Settings fontSize="small" />
            </IconButton>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#9146ff",
                "&:hover": { bgcolor: "#7c3aed" },
                textTransform: "none",
                minWidth: "auto",
                px: 2,
              }}
            >
              Chat
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
