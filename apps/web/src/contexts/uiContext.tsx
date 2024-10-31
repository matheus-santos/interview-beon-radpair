import { createContext, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface IUIContext {
  navbarInteractiveElementRef: React.RefObject<HTMLElement>;
  onNavInitialized(): void;
  navbarInteractivePortal(children: React.ReactNode): React.ReactNode;
  mainScrollElementRef: React.RefObject<HTMLElement>;
}

export const UIContext = createContext<IUIContext>({
  navbarInteractiveElementRef: { current: null },
  mainScrollElementRef: { current: null },
  onNavInitialized: () => null,
  navbarInteractivePortal: () => null,
});

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [forceRefreshCount, setForceRefreshCount] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const scrollElemRef = useRef<HTMLElement>(null);

  const value = useMemo(
    (): IUIContext => ({
      navbarInteractiveElementRef: navRef,
      mainScrollElementRef: scrollElemRef,
      onNavInitialized: () => {
        setForceRefreshCount((c) => c + 1);
      },
      navbarInteractivePortal: (children) => {
        if (navRef.current) {
          return <div>{createPortal(children, navRef.current)}</div>;
        } else {
          return (
            <div>{createPortal(children, document.createElement('div'))}</div>
          );
        }
      },
    }),
    [forceRefreshCount],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
