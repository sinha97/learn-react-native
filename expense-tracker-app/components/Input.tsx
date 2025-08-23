import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { inputProps } from "@/types";
import { colors, radius, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

const Input = (props: inputProps) => {
  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}
    >
      {props.icon && props.icon}
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(54),
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal:spacingX._12,
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: verticalScale(16),
  },
});
