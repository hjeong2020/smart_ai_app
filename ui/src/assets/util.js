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


export const matchIcon = (menu) => {
    switch (menu) {
      case "Chat":
        return <ChatIcon />;
      case "RAG Chat":
        return <QuestionAnswerIcon />;
      case "Advanced Chat":
        return <TelegramIcon />;
      case "Structured Chat":
        return <SpeakerNotesIcon />;
      case "Bitcoin Price Prediction":
        return <CurrencyBitcoinIcon />;
      case "Stock Price Prediction":
        return <ShowChartIcon />;
      case "Movie Recommender":
        return <MovieFilterIcon />;
      case "Music Recommender":
        return <LibraryMusicIcon />;
      case "Face Age Recognition":
        return <AccountBoxIcon />;
      case "Image Caption Generator":
        return <SubtitlesIcon />;
      default:
        return <SubtitlesIcon />;
    }
  };