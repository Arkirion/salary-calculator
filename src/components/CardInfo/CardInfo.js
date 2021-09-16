import "./CardInfo.scss";
import Detail from "../Detail/Detail";
import CardHeader from "../CardHeader/CardHeader";
import { detailsEnum } from "../../base/enum";


function CardInfo({ coinInfo, money, hours }) {
  const { label, classColor, price } = coinInfo;
  return (
    <article className="info-wrapper">
      <CardHeader
        label={label}
        color={classColor}
        coinPrice={price}
      />
      <div className="info-item-list">
        {detailsEnum.map((detail) => (
          <Detail
            key={detail.action}
            label={detail.label}
            action={detail.action}
            money={money}
            coinPrice={price}
            hours= {hours}
          />
        ))}
      </div>
    </article>
  );
}

export default CardInfo;
