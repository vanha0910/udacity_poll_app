import React from "react";

const Error = ({ msg }: { msg: string }) => {
  return <div className="err-mess mb-2">{msg}</div>;
};

export default Error;
