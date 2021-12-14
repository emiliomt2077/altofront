import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  // const [workList, setWorkList] = useState([]);

  // useEffect(() => {
  //   window
  //     .fetch("/api/work")
  //     .then((response) => response.json())
  //     .then(({ data, length }) => {
  //       setWorkList(data);
  //     });
  // }, []);

  return (
    <div className="viewport">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
