import { Box } from '@chakra-ui/react';
import './App.css';

import { RoutesOfAllPages } from './Routes/Routes';
import { Navbar } from "./components/Navbar/Navbar"
function App() {
  return (
    <Box  >
    <Navbar/>
    <RoutesOfAllPages />

    </Box>
  );
    
}

export default App;
