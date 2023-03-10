import { createStackNavigator } from "react-navigation-stack";
import { INDEX_LEARN_SCREEN, ARTICLE_SCREEN } from "./screens";
import ArticleScreen from "./ArticleScreen";
import LearnScreen from "./LearnScreen";

export default createStackNavigator(
  {
    [ARTICLE_SCREEN]: ArticleScreen,
    [INDEX_LEARN_SCREEN]: LearnScreen,
  },
  {
    initialRouteName: INDEX_LEARN_SCREEN,
  }
);
