const EmailSign = ({ user }: any) => {
  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Email Signature</div>
      <>
        <div className="text-xs w-full h-20 flex items-center justify-center">
          <div>Your custom email signature is currently not active.</div>{" "}
        </div>
      </>
    </div>
  );
};

export default EmailSign;
