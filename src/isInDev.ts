import { Constants } from "expo";

export default () => {
  return !Constants.manifest.revisionId;
};
