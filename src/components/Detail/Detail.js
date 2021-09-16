import "./Detail.scss";
import { formatToArgentinaCurrency } from "../../base/utils";
import { Period } from "../../base/enum";

function Detail({ label, action, money, coinPrice, hours }) {

  const calculateAmountByPeriod = (action) => {
    const periodCalculator = {
      hour: () => {
        return money / hours;
      },
      day: () => {
        return (money / hours) * Period.HOURS_PER_DAY;
      },
      week: () => {
        return money / Period.WEEKS_PER_MONTH;
      },
      month: () => {
        return money;
      },
      year: () => {
        return money * Period.MONTHS_PER_YEAR;
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
