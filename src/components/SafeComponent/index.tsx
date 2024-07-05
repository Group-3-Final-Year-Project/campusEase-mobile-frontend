import React, { useState, useEffect, useRef } from "react";
import { Container, Content, Title, ContainedText } from "./styles";
import Button from "~components/Button";
import NetInfo, {
  NetInfoChangeHandler,
  NetInfoState,
} from "@react-native-community/netinfo";
import ErrorBoundary from "react-native-error-boundary";
import LoadingView from "~components/LoadingView";
import LottieView from "lottie-react-native";

export const SafeComponentLottieView = ({ source }: any) => {
  const confettiRef = useRef<LottieView>(null);
  return (
    <LottieView
      ref={confettiRef}
      source={source}
      autoPlay={true}
      loop={true}
      style={{
        zIndex: 1000,
        pointerEvents: "none",
        width: 200,
        height: 200,
      }}
      resizeMode="cover"
    />
  );
};

export const OfflineComponent = ({ refetch }: { refetch: () => void }) => {
  return (
    <Container>
      <Content>
        <SafeComponentLottieView
          source={require("~animations/disconnected.json")}
        />
        <Title>Oops, you are offline</Title>
        <ContainedText>
          Wait a while and try again when the connection is stable
        </ContainedText>
        <Button onPress={() => refetch()} style={{ paddingHorizontal: 20 }}>
          Try again
        </Button>
      </Content>
    </Container>
  );
};

export const RequestErrorComponent = ({ refetch }: { refetch: () => void }) => {
  return (
    <Container>
      <Content>
        <SafeComponentLottieView source={require("~animations/error.json")} />
        <Title>Oops, something went wrong</Title>
        <ContainedText>
          We are unable to process your request at this time, but we are working
          to resolve the issue.
        </ContainedText>
        <Button onPress={() => refetch()} style={{ paddingHorizontal: 20 }}>
          Try again
        </Button>
      </Content>
    </Container>
  );
};

export const UnknownErrorComponent = () => {
  return (
    <Container>
      <Content>
        <SafeComponentLottieView source={require("~animations/error.json")} />
        <Title>Oops, something went wrong</Title>
        <ContainedText>Try again</ContainedText>
      </Content>
    </Container>
  );
};

// NetInfo is always disconnected on the first render. Workaround hook
export function useIsOffline() {
  const [netInfo, setNetInfo] = useState({
    isInternetReachable: true,
  });

  const netInfoChangeHandler: NetInfoChangeHandler = () => setNetInfo;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(netInfoChangeHandler);
    return unsubscribe;
  }, []);

  return !netInfo.isInternetReachable;
}

interface SafeComponentProps {
  request?: { data?: any; error?: any; loading?: boolean };
  refetch?: () => void;
  children: any;
}

export default function SafeComponent({
  request,
  children,
  refetch,
}: SafeComponentProps) {
  const offline = useIsOffline();

  const SafeChildren = (
    <ErrorBoundary FallbackComponent={UnknownErrorComponent}>
      {children || null}
    </ErrorBoundary>
  );

  if (request?.loading)
    return (
      <Content>
        <LoadingView />
      </Content>
    );

  if (request?.data) return SafeChildren;
  if (request && offline) return <OfflineComponent refetch={refetch!} />;
  if (request?.error) return <RequestErrorComponent refetch={refetch!} />;

  return SafeChildren;
}
