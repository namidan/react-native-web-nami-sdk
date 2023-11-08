import React, { ReactNode } from "react";

type MainContainerProps = {
  children: ReactNode | ReactNode[];
};

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement)
      )}
    </>
  );
}
