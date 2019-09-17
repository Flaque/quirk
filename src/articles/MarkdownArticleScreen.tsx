import React from "react";
import ScreenProps from "../ScreenProps";
import { THOUGHT_SCREEN } from "../main/screens";
import MarkdownArticle from "./MarkdownArticle";

const pageOne = `
# CBT is well studied

Cognitive Behavioral Therapy is the de-facto standard treatment for mood disorders like anxiety and depression. However, even if you haven't been diagnosed with a severe mental health condition, CBT can still help you feel happier and better manage your life. 

Like physical therapy, CBT is exercise and goal based. It's something you have to practice. CBT isn't something you read about and then all of a sudden feel better; you have to actively do the exercises. 
`;

const pageTwo = `
# Negative thoughts cause your mood

The primary premise of CBT is that your thoughts cause your mood. They're obviously not the *only* cause;  sleep, diet, and exercise can all have quite significant effects. But your thoughts and world view are powerful forces in shaping your day-to-day mood. 

Your brain is *really* good at making you feel exactly what you're thinking.

# Negative thoughts can compound on each other

To see how this happens, let's imagine you're job-hunting. You just finished an interview and they gave you a tough final question that you weren't sure how to answer. 

After the interview, you keep repeating that experience in your head. You start by thinking "I *know* I failed that interview, I must have screwed up on that question." Before you realize it, you're thinking "What if this happens in the next interview, I'll probably fail that one too. I'm gonna fail all my interviews!" Which then leads you to think "Oh god, if I fail all these interviews, I must just be stupid. I'm probably not even right for this career path, I should just give up." 

It's not uncommon for this type of thought pattern to happen quickly, each thought happening only minutes or even seconds after the previous. At the end, you're likely feeling terrible. 

This process is called "Catastrophizing" and it's quite common, even for folks who aren't diagnosed with any particular mental illness. But that doesn't mean it has to keep happening to you. 
`;

const pageThree = `
# These thoughts are automatic

In some cases, you can cause a thought to happen. For example, if you say the words "I'm a purple elephant bear" in your head, you're causing that thought to happen. When you do that, you can pretty clearly tell that you're *not* a purple elephant bear, not only because it's absurd, but because you *chose* to think it. 

In our interview example, it's likely that you didn't set out to think each of these thoughts. Instead, they just "happened." Mental health professionals call these "automatic thoughts."  
`;

export default class MarkdownArticleScreen extends React.Component<
  ScreenProps
> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <MarkdownArticle
        pages={[pageOne, pageTwo, pageThree]}
        title="Cognitive Behavioral Therapy 101"
        description="An introduction to Cognitive Behavioral Therapy."
        onFinish={() => {
          this.props.navigation.navigate(THOUGHT_SCREEN);
        }}
        onExit={() => {
          this.props.navigation.navigate(THOUGHT_SCREEN);
        }}
      />
    );
  }
}
