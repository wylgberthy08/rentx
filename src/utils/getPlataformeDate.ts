import { addDays } from "date-fns";
import { Platform } from "react-native";

export function getPlatformDate(date: Date) {
  addDays(date, 1);
}
