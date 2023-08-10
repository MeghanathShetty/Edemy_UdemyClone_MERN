import { useState, useEffect } from "react";
import Link from "next/link";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link className={`nav-link ${current === "/instructor" && "active"}`} href="/instructor">
          Dashboard
      </Link>
      <Link className={`nav-link mb-2 ${
            current === "/instructor/course/create" && "active"
          }`} href="/instructor/course/create">
          Course Create
      </Link>
    </div>
  );
};

export default InstructorNav;
