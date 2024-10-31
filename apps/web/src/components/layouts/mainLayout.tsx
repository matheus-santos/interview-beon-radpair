import { Box } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Outlet } from 'react-router-dom';

import { useUIContext } from '@hooks/useUIContext';
import { Navbar } from './navbar';

export const MainLayout: React.FC = () => {
  const { mainScrollElementRef } = useUIContext();

  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: '#fafafa' } }} />

      <Navbar />

      <Box pt={8} maxHeight="100vh" overflow="auto" ref={mainScrollElementRef}>
        <Box component="main" maxWidth={960} margin="0 auto">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
