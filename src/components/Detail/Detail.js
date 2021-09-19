import "./Detail.scss";
import { formatToArgentinaCurrency } from "../../base/utils";
import { Period } from "../../base/enum";

function Detail({ label, action, balance, coinPrice, hours }) {
  const getAmountByPeriod = (action) => {
    const periodCalculator = {
      hour: () => {
        return balance / hours;
      },
      day: () => {
        return (balance / hours) * Period.HOURS_PER_DAY;
      },
      week: () => {
        return balance / Period.WEEKS_PER_MONTH;
      },
      month: () => {
        return balance;
      },
      year: () => {
        return balance * Period.MONTHS_PER_YEAR;
      },
    };
    return periodCalculator[action]();
  };

  const calculateAmount = (decimalPlaces) => {
    const coinValue = Number.parseFloat(coinPrice);

    if (Number.isNaN(coinValue)) return "$ 0,00";
    const amountByPeriod = getAmountByPeriod(action);

    // const amountDividedByCoinValue = amountByPeriod / coinValue.toFixed(4);
    const formatedValue = formatToArgentinaCurrency(
      // amountDividedByCoinValue,
      amountByPeriod,
      decimalPlaces
    );
    console.log(typeof formatedValue)
    return formatedValue;
  };

  return (
    <div className="info-item" key={action}>
      <p>{label}</p>
      <p title={calculateAmount(5) || ""}>{calculateAmount(2).replace(/\,0+$/,'') || ""}</p>
    </div>
  );
}

export default Detail;
