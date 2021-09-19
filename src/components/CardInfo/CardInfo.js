import "./CardInfo.scss";
import Detail from "../Detail/Detail";
import CardHeader from "../CardHeader/CardHeader";
import { detailsEnum } from "../../base/enum";


function CardInfo({ coinInfo, coinSymbol , balance, hours, asset }) {
  console.log(coinSymbol)
  const { label, classColor, price } = coinInfo[coinSymbol];


  const setArgsValues = {
    USD: () => {
      const result = balance / Number.parseFloat(coinInfo["USD"].price);
      return result;
    },
    USDBLUE: () => {
      return balance / Number.parseFloat(coinInfo["USDBLUE"].price);
    },
    ARGS: () => {
      return balance * 1;
    },
  };

  const setUsdValues = {
    USD: () => {
      return balance * 1;
    },
    USDBLUE: () => {
      return (balance * Number.parseFloat(coinInfo["USD"].price)) / Number.parseFloat(coinInfo["USDBLUE"].price);
    },
    ARGS: () => {
      return balance * Number.parseFloat(coinInfo["USD"].price);
    },
  };

  const setUsdblueValues = {
    USD: () => {
      return (balance * Number.parseFloat(coinInfo["USDBLUE"].price)) / Number.parseFloat(coinInfo["USD"].price);
    },
    USDBLUE: () => {
      return balance * 1;
    },
    ARGS: () => {
      return balance * Number.parseFloat(coinInfo["USDBLUE"].price);
    },
  };


  /**
   * @param {string} asset it represents the asset input type. e.g USD, ARGS, USDBLUE
   */
  const getCoinValueByAsset = () => {
    if (asset === "ARG") {
      return setArgsValues[coinSymbol]();
    }
    if (asset === "USD") {
      return setUsdValues[coinSymbol]();
    }
    if (asset === "USDBLUE") {
      return setUsdblueValues[coinSymbol]();
    }
  };
  
  balance = balance && getCoinValueByAsset();
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
