import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
