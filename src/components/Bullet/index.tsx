import React from "react";

import { Container } from "./styles";

interface bulletProps {
  active?: boolean;
}

export function Bullet({ active = false }: bulletProps) {
  return <Container active={active} />;
}
