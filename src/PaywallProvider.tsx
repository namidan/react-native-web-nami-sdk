import React, { createContext, useContext, useMemo } from 'react';

export const PaywallContext = createContext(null);

export const PaywallProvider = ({ children, state, actions }: any) => {
  const contextValue = useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions]
  );

  return (
    <PaywallContext.Provider value={contextValue}>
      {children}
    </PaywallContext.Provider>
  );
};

export const usePaywallContext = () => {
  const context = useContext(PaywallContext);
  if (!context) {
    throw new Error('usePaywallContext must be used within a PaywallProvider');
  }
  return context;
};
