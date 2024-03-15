import useCounterStore from "@/store/counter";
import useGlobalStore from "@/store/global";
import { Button } from "@arco-design/mobile-react";
import ImagePreviewDemo from "@/components/ImagePreviewer";
import {
  Switch,
  Cell,
  Skeleton,
  Keyboard,
  PullRefresh,
} from "@arco-design/mobile-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const counter = useCounterStore((state) => state.counter);
  const increase = useCounterStore((state) => state.increase);
  const { darkMode, setDarkMode } = useGlobalStore((state) => state);
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate();
  const [type, setType] = React.useState<
    "number" | "confirm" | "tool" | undefined
  >("number");
  const [title, setTitle] = React.useState(null);

  const close = () => {
    setVisible(false);
    return {};
  };
  return (
    <PullRefresh>
      <div>Home Page</div>
      <Skeleton avatar />
      <Button onClick={() => increase(1)}> counter: {counter} </Button>
      <Cell.Group bordered={false}>
        <Cell label="Dark Mode">
          <Switch
            checked={darkMode}
            platform="ios"
            onChange={(value) => {
              console.log(value);
              setDarkMode(value);
            }}
          />
        </Cell>
        <Cell
          label="弹出默认键盘"
          showArrow
          onClick={() => {
            setType("number");
            setVisible(true);
            setTitle(null);
          }}
        />
      </Cell.Group>
      <Keyboard
        type={type}
        visible={visible}
        close={close}
        needBottomOffset
        maskClosable
        preventBodyScroll={false}
        onConfirm={() => {
          console.log("confirm");
          return {};
        }}
        onDelete={() => {
          console.log("delete");
          return {};
        }}
        onChange={(data) => {
          console.log(data);
          return {};
        }}
        title={title}
        randomOrder={false}
      />
      <ImagePreviewDemo />
      <Button
        onClick={() => {
          navigate("/todos");
        }}
      >
        去待办事项
      </Button>
    </PullRefresh>
  );
};

export default Home;
