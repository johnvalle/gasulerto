import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box } from "@core/components";
import theme from "@core/constants/theme";

import { NotificationType } from "../types/components";

type Props = {
  type: NotificationType;
};

export const NotificationIcon = (props: Props) => {
  const { type } = props;

  const getIconName = () => {
    if (type === "info") {
      return "information";
    }

    if (type === "danger") {
      return "alert-circle";
    }

    if (type === "warning") {
      return "alert";
    }

    return "information";
  };

  return (
    <Box bg={type} padding="2xs" borderRadius={theme.spacing["2xs"]}>
      <Icon name={getIconName()} size={16} color={theme.colors.white} />
    </Box>
  );
};

export type NotificationIconProps = Props;
