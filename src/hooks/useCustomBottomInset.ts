import { useSafeAreaInsets } from "react-native-safe-area-context";

const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

export default useCustomBottomInset;
