import { useEffect } from "react";
import * as Sentry from "@sentry/react";

export default function Start({ transaction }) {
  useEffect(() => {
    // 捕获自定义事件
    Sentry.captureMessage("用户点击了按钮4", Sentry.Severity.Info);
    console.log("222222");

    // 模拟一个错误并捕获它
    try {
      throw new Error("这是一个模拟错误");
    } catch (error) {
      // Sentry.captureException(error);
    }

    return () => {};
  }, []);

  function simulateAPIRequest() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("模拟的API响应");
      }, 2000); // 假设API响应需要2秒
    });
  }

  const handleClick = () => {
    // 在按钮点击时也可以发送自定义事件
    Sentry.captureMessage("按钮被点击了3");
    console.log("111");
  };
  const handleClick2 = async () => {
    const transaction1 = Sentry.startTransaction({ name: "测试事务" });
    const span = transaction1.startChild({ op: "functionX" }); // functionX 是一个标记  可以随便取
    await simulateAPIRequest();
    span.finish();
    transaction1.finish();
  };

  const handleClick3 = () => {
    // 开始一个Span来记录页面A上的操作
    const spanA = transaction.startChild({
      op: "page-a-operation",
    });

    spanA.setData("start", {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
    });
    spanA.finish();
  };

  return (
    <div>
      <h1>我的组件</h1>
      <button onClick={handleClick}>发起一个事件</button>
      <button onClick={handleClick2}>发起一个事务</button>
      <button onClick={handleClick3}>跨页面发起一个事务</button>
    </div>
  );
}
