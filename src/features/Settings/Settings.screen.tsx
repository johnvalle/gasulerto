import { Image } from "react-native";

import { Text, Wrapper } from "@core/components";

import SettingsPageBanner from "@assets/images/settings-page.png";

import SettingItem from "./components/SettingItem";

function Settings() {
  return (
    <Wrapper>
      <Image source={SettingsPageBanner} style={{ width: 300, height: 200 }} resizeMode="contain" />
      <Text variant="mediumBold" color="black" marginVertical="md">
        Settings
      </Text>
      <SettingItem title="Gas leak threshold" description="Alarm when threshold is exceeded" />
    </Wrapper>
  );
}

export default Settings;
