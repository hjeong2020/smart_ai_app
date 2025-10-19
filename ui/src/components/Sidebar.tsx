import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Test from "./Test";
import { useState } from "react";
import Chat from "./Chat";
// import { matchIcon } from "../assets/util";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import TelegramIcon from "@mui/icons-material/Telegram";
import ChatIcon from "@mui/icons-material/Chat";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import ShowChartIcon from "@mui/icons-material/ShowChart";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function Sidebar(props: Props) {
  const [selectedComponent, setSelectedComponent] = useState("");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleSelectComponent = (event: string) => {
    setSelectedComponent(event);
  };
  
  const renderContent = () => {
    switch (selectedComponent) {
      case "Chat":
        return <Chat />;
      case "RAG Chat":
        return <Test />;
      case "Advanced Chat":
        return <span>{selectedComponent}</span>;
      case "Structured Chat":
        return <span>{selectedComponent}</span>;
      case "Bitcoin Prediction":
        return <span>{selectedComponent}</span>;
      case "Stock Prediction":
        return <span>{selectedComponent}</span>;
      case "Movie Recommend":
        return <span>{selectedComponent}</span>;
      case "Music Recommend":
        return <span>{selectedComponent}</span>;
      case "Age Recognition":
        return <span>{selectedComponent}</span>;
      case "Image Caption":
        return <span>{selectedComponent}</span>;
      default:
        return <Chat />; // Fallback
    }
  };

  const matchIcon = (menu: string) => {
    switch (menu) {
      case "Chat":
        return <ChatIcon />;
      case "RAG Chat":
        return <QuestionAnswerIcon />;
      case "Advanced Chat":
        return <TelegramIcon />;
      case "Structured Chat":
        return <SpeakerNotesIcon />;
      case "Bitcoin Prediction":
        return <CurrencyBitcoinIcon />;
      case "Stock Prediction":
        return <ShowChartIcon />;
      case "Movie Recommend":
        return <MovieFilterIcon />;
      case "Music Recommend":
        return <LibraryMusicIcon />;
      case "Age Recognition":
        return <AccountBoxIcon />;
      case "Image Caption":
        return <SubtitlesIcon />;
      default:
        return <SubtitlesIcon />;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Chat", "RAG Chat", "Advanced Chat", "Structured Chat"].map(
          (text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => handleSelectComponent(text)}
            >
              <ListItemButton>
                <ListItemIcon>{matchIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {[
          "Bitcoin Prediction",
          "Stock Prediction",
          "Movie Recommend",
          "Music Recommend",
          "Age Recognition",
          "Image Caption",
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleSelectComponent(text)}
          >
            <ListItemButton>
              <ListItemIcon>{matchIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ✨ AI Playground ✨
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {renderContent()}
        {/* <Typography sx={{ marginBottom: 2 }}>{renderContent()}</Typography> */}
      </Box>
    </Box>
  );
}
