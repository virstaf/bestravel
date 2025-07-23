import StartTrialButton from "./start-trial-button";

const StartTrialCta = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 text-center bg-gradient-to-r from-green-400 to-blue-300 text-white py-16 px-8 shadow-lg">
        <h2 className="text-primary font-semibold text-3xl">
          Ready to upgrade the way you Travel?
        </h2>
        <StartTrialButton />
        <p className="text-gray-600 text-sm">
          Start with a 7-Day Free Trial. No commitments. Cancel anytime. Travel
          better from your very first trip.
        </p>
      </div>
    </>
  );
};

export default StartTrialCta;
