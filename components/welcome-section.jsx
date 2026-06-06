import WelcomeCard from "./welcome-card";

const WelcomeSection = async ({ profile }) => {
  const firstName =
    profile?.full_name?.split(" ")[0] || profile?.username || "Traveler";
  const membershipTier = profile?.membership_tier || "Gold";

  return (
    <WelcomeCard
      username={profile?.username}
      firstName={firstName}
      membershipTier={membershipTier}
      onboardingCompleted={profile?.onboarding_completed}
    />
  );
};

export default WelcomeSection;
