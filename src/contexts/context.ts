import React from 'react';
export const FeaturedContext = React.createContext<boolean | undefined>(
  undefined
);

export const ComponentContext = React.createContext<{
  [key: string]: any;
} | null>(null);
