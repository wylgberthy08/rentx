import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { CarsDTO } from "../../dtos/CarDTOS";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  justify-content: flex-end;

  background: ${({ theme }) => theme.colors.header};
  padding: 32px 24px;
`;
export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const Carlist = styled(
  FlatList as new (props: FlatListProps<CarsDTO>) => FlatList<CarsDTO>
).attrs({
  contentContainerStyle: {
    paddingHorizontal: 19,
    paddingVertical: 19,
  },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};
  position: absolute;
  bottom:13px;
  right:22px;
`;
