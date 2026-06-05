interface Props {
  isTrue?: boolean;
  children: React.ReactNode;
}

export function RenderIf({ isTrue, children }: Props) {
  return isTrue ? children : null;
}
