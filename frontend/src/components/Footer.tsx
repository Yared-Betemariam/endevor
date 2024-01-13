const Footer = () => {
  const date = new Date();
  return (
    <div className="bg-gray-900 py-4">
      <div className="container flex justify-between items-center mx-auto">
        <p className="opacity-70">&copy; Endevor {date.getFullYear()}</p>
        <div className="flex space-x-2 opacity-80">
          <p>Privacy and policy</p>
          <p>Terms of services</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
