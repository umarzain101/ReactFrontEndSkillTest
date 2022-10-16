import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

// MUI Imports
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//Components
import Register from "./Components/Register";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </>
  );
}

export default App;
