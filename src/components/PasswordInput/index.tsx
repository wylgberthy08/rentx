import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import {
  ChangePasswordVisibilityButton,
  Container,
  IconContainer,
  InputText,
} from "./styles";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
      />
      <IconContainer isFocused={isFocused}>
        <ChangePasswordVisibilityButton
          onPress={handlePasswordVisibilityChange}
        >
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </ChangePasswordVisibilityButton>
      </IconContainer>
    </Container>
  );
}
