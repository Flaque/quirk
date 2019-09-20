import { createStackNavigator } from "react-navigation";
import { INDEX_LEARN_SCREEN, ARTICLE_SCREEN } from "./screens";
import ArticleScreen from "./ArticleScreen";
import IndexLearnScreen from "./IndexLearnScreen";
// import LearnScreen from "./LearnScreen";

export default createStackNavigator(
  {
    [ARTICLE_SCREEN]: ArticleScreen,
    [INDEX_LEARN_SCREEN]: IndexLearnScreen,
  },
  {
    initialRouteName: INDEX_LEARN_SCREEN,
  }
);
