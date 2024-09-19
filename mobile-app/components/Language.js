import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const languages = [
  { lang: "hi", name: "Hindi" },
  { lang: "en", name: "English" },
  { lang: "mr", name: "Marathi" },
];

export function Language() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [activeLangScale] = React.useState(new Animated.Value(1));

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);

    // Animate the active language button when selected
    Animated.sequence([
      Animated.timing(activeLangScale, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(activeLangScale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Choose Your Language')}</Text>
      <View style={styles.buttonsContainer}>
        {languages.map(({ lang, name }) => (
          <TouchableOpacity
            key={lang}
            onPress={() => changeLanguage(lang)}
            style={[
              styles.button,
              currentLanguage === lang && styles.activeButton,
            ]}
          >
            <Animated.Text
              style={[
                styles.buttonText,
                currentLanguage === lang && styles.activeButtonText,
                currentLanguage === lang && { transform: [{ scale: activeLangScale }] },
              ]}
            >
              {name}
            </Animated.Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap:'wrap',
    gap:10,
    width: "100%",
  },
  button: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: "#007AFF",
    borderWidth: 2,
    borderColor: "#005BBB",
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  activeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
