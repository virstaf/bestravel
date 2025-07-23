import StartTrialButton from "./start-trial-button";

const TrialCTA = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white my-12">
      <h2 className="text-3xl font-semibold mb-4">Try it out for free?</h2>
      <div className="text-lg text-primary mb-4">
        <StartTrialButton variant="outline" className="text-primary" />
      </div>
    </div>
  );
};

export default TrialCTA;
