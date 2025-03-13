const GetInTouch = () => {
  return (
    <div className="w-full py-8">
      <div className="content px-4 md:px-8 lg:px-12 max-w-[750px] mx-auto">
        <h2 className="text-sm uppercase font-bold text-center mb-6">
          📞 Get in Touch!
        </h2>
        <div className="grid">
          <div className="flex flex-col gap-4">
            <p>
              Have questions? Need help with your membership? Fill out the form
              below, and our travel experts will get back to you ASAP!
            </p>
            <ul className="mb-6">
              <li>📞 Call Us: +44 (0) 1234 567 890</li>
              <li>📧 Email Us: support@bestravelperks.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
