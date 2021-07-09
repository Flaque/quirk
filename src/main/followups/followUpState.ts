import { Thought } from "../../thoughts";
import dayjs from "dayjs";

export default (thought: Thought): "none" | "scheduled" | "ready" => {
  if (!thought.followUpDate) {
    return "none";
  }

  const isInFuture = dayjs(thought.followUpDate).isAfter(dayjs());
  if (isInFuture) {
    return "scheduled";
  }

  if (!isInFuture && !thought.followUpCompleted) {
    return "ready";
  }

  return "none";
};
