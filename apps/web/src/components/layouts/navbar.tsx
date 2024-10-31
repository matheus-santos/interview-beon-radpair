import { useEffect } from 'react'
import { Box, styled } from '@mui/material'

import { useUIContext } from '@hooks/useUIContext'

const Wrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: 1000,
  background: '#FFF',
  height: '64px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 24px',
  boxShadow: theme.shadows[1],
}))

export const Navbar: React.FC = () => {
  const { navbarInteractiveElementRef, onNavInitialized: _nav_initialize } =
    useUIContext()

  useEffect(() => {
    _nav_initialize()
  }, [])

  return (
    <Wrapper>
      <Box height="100%" flexGrow={1} ref={navbarInteractiveElementRef} />
    </Wrapper>
  )
}
