// src/components/Layout/index.tsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "@arco-design/mobile-react";
import React from "react";
import { NavBarRef } from "@arco-design/mobile-react/esm/nav-bar";

const BasicLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navBarRef = React.useRef<NavBarRef | null>(null);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NavBar
        ref={navBarRef}
        fixed={false}
        onClickLeft={() => navigate(-1)}
        hasBottomLine={false}
        title={pathname}
        rightContent={<span style={{ color: "#165DFF" }}>About</span>}
        onClickRight={() => {
          navigate("/about");
        }}
      />
      <div style={{ padding: "12px", flex: 1, overflowY: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default BasicLayout;
