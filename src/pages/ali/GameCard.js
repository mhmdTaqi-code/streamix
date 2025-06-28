"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  SportsEsports,
  EmojiEvents,
  Timeline,
  Psychology,
  Extension,
  Home,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export default function GamingCenterEnglish() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const games = [
    {
      id: 1,
      title: "Chess",
      description: "The classic game of kings. Test your strategic skills in this timeless masterpiece",
      icon: <SportsEsports sx={{ fontSize: 40, color: "#fff" }} />,
      link: "https://chess-production-0bf3.up.railway.app/chessgame/",
    },
    {
      id: 2,
      title: "Tic Tac Toe",
      description: "Simple and fun game for everyone. Get three marks in a row to win",
      icon: <EmojiEvents sx={{ fontSize: 40, color: "#fff" }} />,
      link: "https://abdullahhasanaen.github.io/xo_new/",
    },
    {
      id: 3,
      title: "Learning Game",
      description: "The beloved classic game. Collect food and make your snake grow longer",
      icon: <Timeline sx={{ fontSize: 40, color: "#fff" }} />,
      link: "https://abdullahhasanaen.github.io/learning_new/",
    },
    {
      id: 4,
      title: "Pig Game",
      description: "Test your memory power. Find matching pairs in the fewest number of attempts",
      icon: <Psychology sx={{ fontSize: 40, color: "#fff" }} />,
      link: "https://abdullahhasanaen.github.io/pig_new/",
    },
    {
      id: 5,
      title: "Pom Game",
      description: "Number arrangement challenge. Sort the numbers in the correct order",
      icon: <Extension sx={{ fontSize: 40, color: "#fff" }} />,
      link: "https://abdullahhasanaen.github.io/pom_new/",
    },
  ];

  const GameCard = ({ game }) => (
    <a
      href={game.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 3,
          cursor: "pointer",
          transition: "all 0.3s ease",
          height: "100%",
          "&:hover": {
            transform: "translateY(-8px)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CardContent
          sx={{
            p: 4,
            textAlign: "left",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            {game.icon}
          </Box>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              color: "white",
              fontWeight: 600,
              mb: 2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {game.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
              flex: 1,
            }}
          >
            {game.description}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
          `,
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          py: { xs: 4, md: 8 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Box
              sx={{
                position: "relative",
                "&::after": {
                  content: '"✨"',
                  position: "absolute",
                  top: -10,
                  right: -10,
                  fontSize: 20,
                  animation: "sparkle 2s ease-in-out infinite",
                },
                "@keyframes sparkle": {
                  "0%, 100%": { opacity: 1, transform: "scale(1)" },
                  "50%": { opacity: 0.5, transform: "scale(1.2)" },
                },
              }}
            >
              <SportsEsports sx={{ fontSize: 48, color: "#64b5f6" }} />
            </Box>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              sx={{
                color: "white",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              Gaming Center
            </Typography>
          </Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 2,
              fontFamily: "'Inter', sans-serif",
           }}
          >
            Enjoy an amazing collection of classic games designed with exceptional care
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "'Inter', sans-serif",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Choose your favorite game and start the fun
          </Typography>
        </Box>

        {/* Games Grid */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            overflowX: "auto",
            pb: 2,
            px: 1,
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            },
          }}
        >
          {games.map((game) => (
            <Box
              key={game.id}
              sx={{
                minWidth: { xs: 280, sm: 320, md: 350 },
                maxWidth: { xs: 280, sm: 320, md: 350 },
                flexShrink: 0,
              }}
            >
              <GameCard game={game} />
            </Box>
          ))}
        </Box>

        {/* Back Button */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            component={RouterLink}
            to="/home"
            sx={{
              background: "linear-gradient(to right, #64b5f6, #42a5f5)",
              color: "#fff",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(to right, #42a5f5, #1e88e5)",
                boxShadow: "0 6px 30px rgba(0,0,0,0.4)",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
