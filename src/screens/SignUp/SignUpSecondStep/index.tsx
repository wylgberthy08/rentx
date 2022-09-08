import React, { useState } from "react";
import { useNavigation, useTheme, useRoute } from "@react-navigation/native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";

import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from "./styles";
import { Button } from "../../../components/Button";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PasswordInput } from "../../../components/PasswordInput";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicence: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();
  const theme = useTheme();
  const routes = useRoute();

  const { user } = routes.params as Params;

  function handleGoBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação dela");
    }
    if (password != passwordConfirm) {
      return Alert.alert("As senhas não são iguais");
    }

    // enviar para API e criar um novo cadastro

    navigation.navigate("Confirmation", {
      nextScreenRoutes: "SignIn",
      title: "Conta Criada",
      message: `Agora é só fazer login\n e aproveitar. `,
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet active={false} />
            </Steps>
          </Header>
          <Title>Crie sua {"\n"} sua conta</Title>
          <SubTitle>
            Faça seu cadastro de {"\n"}
            forma rápida e fácil
          </SubTitle>
          <Form>
            <FormTitle>2.Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button onPress={handleRegister} title="Cadastrar" color="#03b252" />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
