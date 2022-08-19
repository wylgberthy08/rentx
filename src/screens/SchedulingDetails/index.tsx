import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import { Acessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import SpeedSvg from "../../assets/speed.svg";
import acceleration from "../../assets/acceleration.svg";
import force from "../../assets/force.svg";
import gasoline from "../../assets/gasoline.svg";
import exchange from "../../assets/exchange.svg";
import people from "../../assets/people.svg";

import {
  About,
  Acessories,
  Brand,
  CalendarIcon,
  CarImages,
  Container,
  Content,
  DateInfo,
  Description,
  Details,
  Footer,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
  TitleDate,
  TitleValue,
} from "./styles";
import { Header } from "./styles";
import { Button } from "../../components/Button";
import theme from "../../styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { CarsDTO } from "../../dtos/CarDTOS";
import { getAcessoriesIcon } from "../../utils/getAcessoriesIcon";
import { format, parseISO } from "date-fns";
import api from "../../services/api";
import { Alert } from "react-native";

interface Params {
  car: CarsDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleSchedulingComplete() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post(`schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(parseISO(dates[0]), "dd/MM/yyyy"),
      endDate: format(parseISO(dates[dates.length - 1]), "dd/MM/yyyy"),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then((response) => navigation.navigate("SchedulingComplete"))
      .catch(() => {
        Alert.alert("Não foi possível realizar o agendamento");
        setLoading(false);
      });
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(parseISO(dates[0]), "dd/MM/yyyy"),
      end: format(parseISO(dates[dates.length - 1]), "dd/MM/yyyy"),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Acessories>
          {car.accessories.map((accessory) => (
            <Acessory
              key={accessory.type}
              name={accessory.name}
              icon={getAcessoriesIcon(accessory.type)}
            />
          ))}
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <TitleDate>DE</TitleDate>
            <TitleValue>{rentalPeriod.start}</TitleValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.text}
          />
          <DateInfo>
            <TitleDate>DE</TitleDate>
            <TitleValue>{rentalPeriod.end}</TitleValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.rent.price} x{dates.length} diarias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          onPress={handleSchedulingComplete}
          color={theme.colors.sucess}
          title="Alugar agora"
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
