import WelcomeCard from "./welcome-card";
import { getProfileAction } from "@/actions/profiles";

const WelcomeSection = async () => {
  const { profile } = await getProfileAction();
  return <WelcomeCard username={profile.username} />;
};

export default WelcomeSection;
