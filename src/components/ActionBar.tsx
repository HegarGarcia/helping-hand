import { ReactNode } from "react";
import { Appbar } from "react-native-paper";

interface ActionBarProps {
  title?: string;
  onBackPress?: () => void;
  children: ReactNode;
}

export default function ActionBar({ children, onBackPress, title }: ActionBarProps) {
  return (
    <Appbar.Header>
      {onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content title={title} />
      {children}
    </Appbar.Header>
  );
}
