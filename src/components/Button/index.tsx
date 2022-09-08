import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import theme from "../../styles/theme";
import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {
  return (
    <Container
      {...rest}
      color={color}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} size={30} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
