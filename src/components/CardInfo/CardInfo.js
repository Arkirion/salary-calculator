import "./CardInfo.scss";
import Detail from "../Detail/Detail";
import CardHeader from "../CardHeader/CardHeader";
import { detailsEnum } from "../../base/enum";

function CardInfo({ coinInfo, coinSymbol, balance, hours, asset }) {
  const { label, classColor, price } = coinInfo[coinSymbol];

  const toFloat = (stringValue) => {
    return Number.parseFloat(stringValue);
  };

  const convertAssetValues = {
    USD: () => {
      const setValues = {
        USD: () => balance,
        USDBLUE: () =>
          (balance * toFloat(coinInfo["USD"].price)) /
          toFloat(coinInfo["USDBLUE"].price),
        ARGS: () => balance * toFloat(coinInfo["USD"].price),
      };
      return setValues[coinSymbol]();
    },
    USDBLUE: () => {
      const setValues = {
        USD: () =>
          (balance * toFloat(coinInfo["USDBLUE"].price)) /
          toFloat(coinInfo["USD"].price),
        USDBLUE: () => balance,
        ARGS: () => balance * toFloat(coinInfo["USDBLUE"].price),
      };
      return setValues[coinSymbol]();
    },
    ARGS: () => {
      const setValues = {
        USD: () => balance / toFloat(coinInfo["USD"].price),
        USDBLUE: () => balance / toFloat(coinInfo["USDBLUE"].price),
        ARGS: () => balance,
      };
      return setValues[coinSymbol]();
    },
  };

  balance = balance && convertAssetValues[asset]();

  return (
    <article className="info-wrapper">
      <CardHeader label={label} color={classColor} coinPrice={price} />
      <div className="info-item-list">
        {detailsEnum.map((detail) => (
          <Detail
            key={detail.action}
            label={detail.label}
            action={detail.action}
            balance={balance}
            coinPrice={price}
            hours={hours}
          />
        ))}
      </div>
    </article>
  );
}

export default CardInfo;
