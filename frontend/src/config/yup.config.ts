import * as YupSettings from "yup";

YupSettings.setLocale({
  mixed: {
    required: "This item is required",
    default: "This item is required",
  },
  string: {
    email: "Invalid email",
    min: "Invalid min characters",
    max: "Invalid max characters",
  },
  array: {
    min: "This item is required",
  },
});

export default YupSettings;
