import { StyleSheet } from "react-native";


export default StyleSheet.create({
    pages: {
      flex: 1,
    },
    container: {
      margin: 10,
    },
    image: {
      width: "100%",
      aspectRatio: 5 / 3,
    },
    title: {
      fontSize: 35,
      fontWeight: "600",
      marginVertical: 10,
    },
    subtitle: {
      color: "#525252",
      fontSize: 15,
    },
    iconContainer: {
      position: "absolute",
      top: 40,
      left: 10,
    },
    menuTitle:{
      marginTop: 20,
      marginVertical: 10,
      fontSize: 16,
      letterSpacing: 0.7
    }
  });