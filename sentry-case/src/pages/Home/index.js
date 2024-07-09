export default function Home({ transaction }) {
  const handleClick = () => {
    console.log("结束事务");

    if (transaction) {
      const span = transaction.startChild({
        op: "1234",
        description: "GET /api/data",
      });
      span.setData("customKey", "customValue");
      span.finish();
      transaction.finish();
    }
  };

  console.log("Home组件渲染");

  return (
    <div>
      <button onClick={handleClick}>结束跨页面的事务</button>
    </div>
  );
}
