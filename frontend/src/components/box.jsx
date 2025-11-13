export default function Box({
  width,
  height,
  backgroundColor,
  radius,
  children,
}) {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor,
    borderRadius: `${radius}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  };

  return <div style={style}>{children}</div>;
}
