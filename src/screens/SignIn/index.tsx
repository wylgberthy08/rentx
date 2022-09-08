import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import theme from "../../styles/theme";

import { Container, Footer, Form, Header, SubTitle, Title } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigtório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha é obrigatoria"),
      });

      await schema.validate(email, password);
      Alert.alert("Tudo certo");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("opa", error.message);
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer um login, verifique as credenciais"
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos {"\n"}
              quase lá
            </Title>
            <SubTitle>
              Faça seu login para começar {"\n"} uma experiência incrivel
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
              color={theme.colors.background_primary}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
