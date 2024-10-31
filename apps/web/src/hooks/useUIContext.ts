import { useContext } from 'react';

import { UIContext } from '@contexts/uiContext';

export const useUIContext = () => useContext(UIContext);
