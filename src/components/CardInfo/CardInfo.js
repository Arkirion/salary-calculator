import "./CardInfo.scss";
import Detail from "../Detail/Detail";
import CardHeader from "../CardHeader/CardHeader";

function CardInfo(props) {
  const headerInfo = props.coinInfo; // price added by useEffect
  const detailsInfo = props.details;

  return (
    <article className="info-wrapper">
      <CardHeader
        label={headerInfo.label}
        color={headerInfo.color}
        coinPrice={headerInfo.price}
      />
      <div className="info-item-list">
        {detailsInfo.map((detail) => (
          <Detail
            key={detail.action}
            label={detail.label}
            action={detail.action}
            money={props.money}
            coinPrice={headerInfo.price}
            divisor={props.divisor}
          />
        ))}
      </div>
    </article>
  );
}

export default CardInfo;
