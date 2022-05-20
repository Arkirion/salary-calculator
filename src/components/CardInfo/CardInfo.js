import "./CardInfo.scss";
import Detail from "../Detail/Detail";
import CardHeader from "../CardHeader/CardHeader";
import { detailsEnum } from "../../base/enum";
import { config } from "../../base/config";

function CardInfo({ coinInfo, coinSymbol, balance, hours, asset }) {
  const { label, classColor, price } = coinInfo[coinSymbol];

  const toFloat = (stringValue) => {
    return Number.parseFloat(stringValue);
  };

  const USDsymbol = config.assets.USD.symbol
  const USDBLUEsymbol = config.assets.USDBLUE.symbol

  // TODO replace it for a pattern in order to do it adaptable to new coins, maybe a command pattern mixed with another one (builder)
  const convertAssetValues = {
    USD: () => {
      const setValues = {
        USD: () => balance,
        USDBLUE: () =>
          (balance * toFloat(coinInfo[USDsymbol].price)) /
          toFloat(coinInfo[USDBLUEsymbol].price),
        ARGS: () => balance * toFloat(coinInfo[USDsymbol].price),
      };
      return setValues[coinSymbol]();
    },
    USDBLUE: () => {
      const setValues = {
        USD: () =>
          (balance * toFloat(coinInfo[USDBLUEsymbol].price)) /
          toFloat(coinInfo[USDsymbol].price),
        USDBLUE: () => balance,
        ARGS: () => balance * toFloat(coinInfo[USDBLUEsymbol].price),
      };
      return setValues[coinSymbol]();
    },
    ARG: () => {
      const setValues = {
        USD: () => balance / toFloat(coinInfo[USDsymbol].price),
        USDBLUE: () => balance / toFloat(coinInfo[USDBLUEsymbol].price),
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
