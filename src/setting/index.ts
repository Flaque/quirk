export const HISTORY_BUTTON_LABEL_KEY = "history-button-labels";
export type HistoryButtonLabelSetting =
  | "alternative-thought"
  | "automatic-thought";
export function isHistoryButtonLabelSetting(
  arg: string
): arg is HistoryButtonLabelSetting {
  return arg === "alternative-thought" || arg === "automatic-thought";
}
export const HISTORY_BUTTON_LABEL_DEFAULT: HistoryButtonLabelSetting =
  "alternative-thought";
