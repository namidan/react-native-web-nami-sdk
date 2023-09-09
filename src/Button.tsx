import React from "react";
import "react-spring-bottom-sheet/dist/style.css";

import PaywallPreview from "./components/PaywallPreview";
import { paywallStore } from "./services/paywallService";

interface ButtonProps {
  label: string;
}

export const ButtonNami: React.FC<ButtonProps> = () => {
  const renderBottomSheet = () => {
    return (
      <PaywallPreview
        template={paywallStore.getTemplate()}
        focusedState={true}
        currentPage={"1"}
        groupId={"c9c90c98-388c-46e3-8b9b-f5827985f8b3"}
      />
    );
  };

  return <>{renderBottomSheet()}</>;
};
