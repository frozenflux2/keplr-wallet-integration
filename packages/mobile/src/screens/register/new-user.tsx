import React, { FunctionComponent } from "react";
import { useHeaderHeight } from "@react-navigation/stack";
import { PageWithScrollView } from "../../components/page";
import { KeplrLogo } from "../../components/svg";
import { GoogleIcon, AppleIcon } from "../../components/icon";
import { useStyle } from "../../styles";
import { View, Text, Dimensions, Platform, StyleSheet } from "react-native";
import { Button } from "../../components/button";
import { useSmartNavigation } from "../../navigation";
import { useRegisterConfig } from "@keplr-wallet/hooks";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const RegisterNewUserScreen: FunctionComponent = observer(() => {
  const { keyRingStore, analyticsStore } = useStore();

  const style = useStyle();

  const smartNavigation = useSmartNavigation();

  const registerConfig = useRegisterConfig(keyRingStore, []);

  const safeAreaInsets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const actualHeightHeight = headerHeight - safeAreaInsets.top;

  return (
    <PageWithScrollView
      contentContainerStyle={style.get("flex-grow-1")}
      style={StyleSheet.flatten([
        style.flatten(["padding-x-42"]),
        {
          paddingTop:
            Dimensions.get("window").height * 0.22 - actualHeightHeight,
          paddingBottom: Dimensions.get("window").height * 0.11,
        },
      ])}
    >
      <View
        style={style.flatten(["flex-grow-1", "items-center", "padding-x-18"])}
      >
        <KeplrLogo width="100%" />
      </View>
      {Platform.OS === "ios" ? (
        <Button
          containerStyle={style.flatten([
            "margin-bottom-20",
            "border-width-1",
            "border-color-divider",
          ])}
          text="Sign in with Apple"
          leftIcon={
            <View style={style.flatten(["margin-right-6", "margin-bottom-4"])}>
              <AppleIcon />
            </View>
          }
          style={style.flatten(["background-color-white"])}
          textStyle={style.flatten(["color-black"])}
          underlayColor="#00000020"
          size="large"
          mode="light"
          onPress={() => {
            analyticsStore.logEvent("OAuth sign in started", {
              registerType: "apple",
            });
            smartNavigation.navigateSmart("Register.TorusSignIn", {
              registerConfig,
              type: "apple",
            });
          }}
        />
      ) : null}
      <Button
        containerStyle={style.flatten(["margin-bottom-20"])}
        text="Sign in with Google"
        leftIcon={
          <View style={style.flatten(["margin-right-6"])}>
            <GoogleIcon />
          </View>
        }
        size="large"
        mode="light"
        onPress={() => {
          analyticsStore.logEvent("OAuth sign in started", {
            registerType: "google",
          });
          smartNavigation.navigateSmart("Register.TorusSignIn", {
            registerConfig,
            type: "google",
          });
        }}
      />
      <Text
        style={style.flatten([
          "margin-bottom-20",
          "text-center",
          "color-text-black-low",
        ])}
      >
        Powered by Torus
      </Text>
      <Button
        text="Create new mnemonic"
        size="large"
        mode="light"
        onPress={() => {
          analyticsStore.logEvent("Create account started", {
            registerType: "seed",
          });
          smartNavigation.navigateSmart("Register.NewMnemonic", {
            registerConfig,
          });
        }}
      />
    </PageWithScrollView>
  );
});
