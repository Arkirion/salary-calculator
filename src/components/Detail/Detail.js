import "./Detail.scss";
import { formatToArgentinaCurrency } from "../../base/utils";
import { Period } from "../../base/enum";

function Detail({ label, action, money, coinPrice, divisor }) {
  const calculateAmountByPeriod = (action) => {
    let periodAmount = 0;
    const periodCalculator = {
      hour: () => {
        return money / divisor;
      },
      day: () => {
        return (money / divisor) * Period.HOURS_PER_DAY;
      },
      week: () => {
        return (periodAmount = money / Period.WEEKS_PER_MONTH);
      },
      month: () => {
        return (periodAmount = money);
      },
      year: () => {
        return (periodAmount = money * Period.MONTHS_PER_YEAR);
      },
    };
    return periodCalculator[action]();
  };

  const calculateAmount = (decimalPlaces) => {
    const coinValue = Number.parseFloat(coinPrice);
    if (Number.isNaN(coinValue)) return "$ 0,00";
    const calculatedValue = calculateAmountByPeriod(action);
    const amountDividedByCoinValue = calculatedValue / coinValue.toFixed();
    const formatedValue = formatToArgentinaCurrency(
      amountDividedByCoinValue,
      decimalPlaces
    );
    return formatedValue;
  };

  return (
    <div className="info-item" key={action}>
      <p>{label}</p>
      <p title={calculateAmount(5) || ""}>{calculateAmount(2) || ""}</p>
    </div>
  );
}

export default Detail;
