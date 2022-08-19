import React from "react";

import LottieView from "lottie-react-native";

import AnimationCar from "../../assets/animation.json";

import { Container } from "./styles";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={AnimationCar}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
