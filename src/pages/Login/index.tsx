import { Input, Button, Checkbox, Tabs, Toast } from "@arco-design/mobile-react";
import { IconMore, IconHome, IconShop } from '@arco-design/mobile-react/esm/icon';

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);

  const handleLogin = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault();
    // Login logic goes here
    Toast.success("Logged in successfully!");
  };
  
  return (
    <Tabs tabs={["账户登录", "验证码登录", "第三方登录"]}>
      <div>
        <Input type="text" placeholder="用户名" value={username} onChange={e => setUsername(e.target.value)} />
        <Input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} />
        <Checkbox checked={checked} onChange={checked => setChecked(checked)} value={""}>记住我</Checkbox>
        <a href="/forgot-password">忘记密码？</a>
        <Button type="primary" onClick={handleLogin}>登录</Button>
      </div>
      <div>
        <Input type="tel" placeholder="手机号" value={phone} onChange={e => setPhone(e.target.value)} />
        <Input type="text" placeholder="验证码" value={code} onChange={e => setCode(e.target.value)} />
        <Button type="primary" onClick={handleLogin}>登录</Button>
      </div>
      <div>
  <p>第三方登录:</p>
  <IconHome className="icon"  onClick={() => Toast.info("Google Sign In")}/>
  <IconShop className="icon"  onClick={() => Toast.info("Facebook Sign In")}/>
  <IconMore className="icon"  onClick={() => Toast.info("Apple Sign In")}/>
</div>
    </Tabs>
  );
}