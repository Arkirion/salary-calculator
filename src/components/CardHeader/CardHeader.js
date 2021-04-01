import "./CardHeader.scss";

function CardHeader({ label, color, coinPrice }) {
  return (
    <header className={`coinValue ${color} `}>
      <div>{label}</div>
      <div>$ {coinPrice}</div>
    </header>
  );
}

export default CardHeader;
