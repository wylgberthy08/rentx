import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { CarsDTO } from "../../dtos/CarDTOS";
import { getAcessoriesIcon } from "../../utils/getAcessoriesIcon";

import {
  About,
  Brand,
  CarImage,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type,
} from "./styles";

interface Props extends RectButtonProps {
  data: CarsDTO;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAcessoriesIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>R$ {data.rent.price}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CarImage source={{ uri: data.thumbnail }} />
    </Container>
  );
}
