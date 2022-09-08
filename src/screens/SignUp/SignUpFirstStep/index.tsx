import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

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

export function SignUpFirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicence, setDriverLicence] = useState("");

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicence: Yup.string().required("CNH é obrigatório"),
        email: Yup.string()
          .required("e-mail é obrigatório")
          .email("digite um email invalido"),
        name: Yup.string().required("Nome é obrigatório"),
      });
      const data = { name, email, driverLicence };
      await schema.validate(data);
      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
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
            <FormTitle>1.Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="e-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicence}
              value={driverLicence}
            />
          </Form>

          <Button onPress={handleNextStep} title="Próximo" />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
