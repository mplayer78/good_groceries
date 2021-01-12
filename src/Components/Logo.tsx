export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          backgroundColor: "white",
          width: 35,
          height: 35,
          borderRadius: "50%",
        }}
      />
      <span
        style={{
          paddingLeft: "10px",
          fontSize: 36,
          margin: 0,
          fontFamily: "Comfortaa",
          fontWeight: 500,
          color: "#46413F",
        }}
      >
        good groceries
      </span>
    </div>
  );
}
