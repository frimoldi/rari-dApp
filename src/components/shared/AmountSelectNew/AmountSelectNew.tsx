import { Box, Heading, Text } from "@chakra-ui/layout";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";
import DashboardBox from "../DashboardBox";
import AwaitingTransactions from "./AwaitingTransactions";

// Hooks
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Types
import { TokenData } from "hooks/useTokenData";
import { USDPricedFuseAsset } from "utils/fetchFusePoolData";

// Utils
import { Column, Row } from "utils/chakraUtils";
import { useBestFusePoolForAsset } from "hooks/opportunities/useBestFusePoolForAsset";
import LendAndBorrow from "./LendAndBorrow";

export enum AmountSelectMode {
  LEND = "Lend",
  WITHDRAW = "Withdraw",
  BORROW = "Borrow",
  REPAY = "Repay",
  LENDANDBORROW = "Lend and Borrow",
}

export enum AmountSelectUserAction {
  NO_ACTION,
  WAITING_FOR_TRANSACTIONS,
}

interface Props {
  onClose?: () => any;
  assets?: USDPricedFuseAsset[];
  modes: AmountSelectMode[];
  comptrollerAddress?: string;
  token?: TokenData;
}

const AmountSelectNew = ({
  onClose,
  modes,
  token,
  assets,
  comptrollerAddress,
}: Props) => {
  const [mode, setMode] = useState<AmountSelectMode>(modes[0]);
  const [userAction, setUserAction] = useState(
    AmountSelectUserAction.NO_ACTION
  );

  return (
    <>
      {userAction === AmountSelectUserAction.WAITING_FOR_TRANSACTIONS ? (
        <AwaitingTransactions token={token} />
      ) : (
        <Column
          expand
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          p={4}
        >
          <TabBar
            mode={mode}
            setMode={setMode}
            modes={modes}
            color={token?.color ?? "white"}
          />
            <Row
              mainAxisAlignment="space-between"
              crossAxisAlignment="center"
              bg=""
              expand
            >
              {mode === AmountSelectMode.LENDANDBORROW && (
                <LendAndBorrow token={token} setUserAction={setUserAction} />
              )}
              {mode === AmountSelectMode.BORROW && (
                <Box h="300px">
                  <Heading>BORROW</Heading>
                </Box>
              )}
              {mode === AmountSelectMode.REPAY && (
                <Box h="350px">
                  <Heading color="white">REPAY</Heading>
                </Box>
              )}
              {mode === AmountSelectMode.LEND && (
                <Box>
                  <Heading>LEND</Heading>
                </Box>
              )}
              {mode === AmountSelectMode.WITHDRAW && (
                <Box>
                  <Heading>WITHDRAW</Heading>
                </Box>
              )}
            </Row>
        </Column>
      )}
    </>
  );
};

export default AmountSelectNew;

const TabBar = ({
  color,
  modes,
  mode,
  setMode,
}: {
  color?: string | null | undefined;
  mode: AmountSelectMode;
  modes: AmountSelectMode[];
  setMode: (mode: AmountSelectMode) => any;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <style>
        {`
              
              .chakra-tabs__tab {
                color: ${color ?? "#FFFFFF"} !important;
  
                border-bottom-width: 1px;
              }
  
              .chakra-tabs__tablist {
                border-bottom: 1px solid;
                border-color: #272727;
              }
              
          `}
      </style>
      <Box width="100%" mt={1} mb="-1px" zIndex={99999}>
        <Tabs
          isFitted
          width="100%"
          align="center"
          onChange={(index: number) => setMode(modes[index])}
        >
          <TabList>
            {modes.map((mode) => {
              return (
                <Tab key={mode} fontWeight="bold" _active={{}} mb="-1px">
                  {t(mode)}
                </Tab>
              );
            })}
          </TabList>
        </Tabs>
      </Box>
    </>
  );
};
