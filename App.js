import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { useState } from "react";
import { Provider } from "react-redux";
import { Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

//components
import Gate from "./components/Gate";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);

  const loadAssests = async () => {
    const images = [
      require("./assets/loginBg.jpg"),
      require("./assets/logo.svg"),
    ];
    const fonts = [Ionicons.font];
    const imagPromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);

    return Promise.all([...fontPromises, ...imagPromises]);
  };

  return isReady ? (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Gate />
      </PersistGate>
    </Provider>
  ) : (
    <AppLoading
      onError={console.error}
      onFinish={handleFinish}
      startAsync={loadAssests}
    />
  );
}
