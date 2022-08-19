import SpeedSvg from "../assets/speed.svg";
import AccelerationSvg from "../assets/acceleration.svg";
import ForceSvg from "../assets/force.svg";
import EnergySvg from "../assets/energy.svg";
import GasolineSvg from "../assets/gasoline.svg";
import HybridySvg from "../assets/hybrid.svg";
import ExchangeSvg from "../assets/exchange.svg";
import PeopleSvg from "../assets/people.svg";
import carSvg from "../assets/car.svg";

export function getAcessoriesIcon(type: string) {
  switch (type) {
    case "speed":
      return SpeedSvg;
    case "acceleration":
      return AccelerationSvg;
    case "turning_diameter":
      return ForceSvg;
    case "electric_motor":
      return EnergySvg;
    case "gasoline_motor":
      return GasolineSvg;
    case "hybrid_motor":
      return HybridySvg;
    case "exchange":
      return ExchangeSvg;
    case "seats":
      return PeopleSvg;

    default:
      return carSvg;
  }
}
