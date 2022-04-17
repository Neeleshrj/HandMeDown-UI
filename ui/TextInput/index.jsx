import { TextInput } from "react-native";

export default function CustomTextInput({
  placeholder,
  placeholderTextColor,
  value,
  multiline,
  numberOfLines,
  onChangeText,
  keyboardType,
  maxLength,
  editable,
  secureTextEntry,
  styling,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      maxLength={maxLength}
      editable={editable}
      secureTextEntry={secureTextEntry}
      style={styling}
    />
  );
}
