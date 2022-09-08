import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Footer, Message, Title } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";

interface Params {
  title: string;
  message: string;
  nextScreenRoutes: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();
  const routes = useRoute();
  const { title, message, nextScreenRoutes } = routes.params as Params;

  function handleHome() {
    navigation.navigate(nextScreenRoutes);
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleHome} />
      </Footer>
    </Container>
  );
}
