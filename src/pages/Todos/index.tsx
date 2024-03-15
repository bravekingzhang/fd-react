import { useState, useEffect } from "react";
import {
  Tabs,
  Cell,
  Skeleton,
  PullRefresh,
  LoadMore,
} from "@arco-design/mobile-react";
import { useFetchTodos } from "@/api/todo";
import { TodoItem } from "@/api/todo/types";

const newsPageOptions = [
  { title: "待办事项", id: "zhihu" },
  { title: "微博", id: "weibo" },
  { title: "微信", id: "weixin" },
  { title: "百度", id: "baidu" },
  { title: "抖音", id: "douyin" },
  { title: "B站", id: "bilibili" },
  { title: "头条", id: "toutiao" },
];

const Todos = () => {
  const [active, setActive] = useState(newsPageOptions[0].id);
  const [list, setList] = useState<TodoItem[]>([]);
  console.log(active);
  const { todos, isLoading, mutate } = useFetchTodos();
  useEffect(() => {
    if (todos) {
      setList((prevList) => [...prevList, ...todos]);
    }
  }, [todos]);
  return (
    <div style={{ height: "100vh" }}>
      <Tabs
        tabs={newsPageOptions.map((item) => item.title)}
        type="line-divide"
        defaultActiveTab={0}
        tabBarHasDivider={false}
        onAfterChange={(_, index) => {
          setActive(newsPageOptions[index].id);
        }}
        translateZ={false}
      >
        <PullRefresh>
          <Cell.Group
            bordered={false}
            style={{ marginTop: "16px", flex: 1, overflow: "scroll" }}
          >
            {isLoading
              ? [1, 2].map((item) => <Skeleton key={item} />)
              : list?.map((item) => (
                  <Cell
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                    key={item.id}
                    children={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                      >
                        <div>
                          <h4 style={{ margin: "0" }}>{item.title}</h4>
                        </div>
                        <div>
                          <span style={{ marginRight: "10px" }}>
                            ID: {item.id}
                          </span>
                          <span>
                            Completed:{" "}
                            {item.completed ? (
                              <span style={{ color: "green" }}>Yes</span>
                            ) : (
                              <span style={{ color: "red" }}>No</span>
                            )}
                          </span>
                        </div>
                      </div>
                    }
                  />
                ))}
            <LoadMore
              style={{ paddingTop: 16, paddingBottom: 44 }}
              getData={() => {
                mutate();
                return {};
              }}
              threshold={0}
              onStatusChange={(st, scene) => console.log("change", st, scene)}
            />
          </Cell.Group>
        </PullRefresh>
      </Tabs>
    </div>
  );
};

export default Todos;
