import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

import AmountSelect from "./AmountSelect";
import { MODAL_PROPS } from "../../../../shared/Modal";
import OptionsMenu from "./OptionsMenu";
import { USDPricedFuseAsset } from "../../FusePoolPage";

interface Props {
  isOpen: boolean;
  onClose: () => any;
  depositSide: boolean;
  index: number;
  assets: USDPricedFuseAsset[];
}

enum CurrentScreen {
  MAIN,
  OPTIONS,
}

export enum Mode {
  SUPPLY,
  WITHDRAW,
  BORROW,
  REPAY,
}

const DepositModal = (props: Props) => {
  const [currentScreen, setCurrentScreen] = useState(CurrentScreen.MAIN);

  const [mode, setMode] = useState(
    props.depositSide ? Mode.SUPPLY : Mode.BORROW
  );

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent {...MODAL_PROPS} height={{ md: "510px", base: "540px" }}>
        {currentScreen === CurrentScreen.MAIN ? (
          <AmountSelect
            onClose={props.onClose}
            openOptions={() => setCurrentScreen(CurrentScreen.OPTIONS)}
            assets={props.assets}
            index={props.index}
            mode={mode}
          />
        ) : (
          <OptionsMenu
            onClose={() => setCurrentScreen(CurrentScreen.MAIN)}
            onSetMode={setMode}
            mode={mode}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
