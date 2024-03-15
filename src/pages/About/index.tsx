import { useNavigate } from "react-router-dom";
import { Button } from "@arco-design/mobile-react";
import "./index.css";
const About = () => {
  const navigate = useNavigate();
  return (
    <div className="container-about">
      <span style={{ color: "#165DFF" }}> About Page</span>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        返回首页
      </Button>
    </div>
  );
};

export default About;
