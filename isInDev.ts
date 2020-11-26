import Constants from 'expo-constants';

export default () => {
  return !Constants.manifest.revisionId;
};
