import { getGravatarUrl, type GravatarOptions } from "react-awesome-gravatar";

const GravatarOption: GravatarOptions = {
  size: 50,
  default: "retro",
};
export default function getGravatar(content: string | undefined) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return String(getGravatarUrl(content ?? "default", GravatarOption));
}
