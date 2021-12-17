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

  const formatValue = (amount, decimalPlaces) =>{
    amount = parseFloat(amount)
    return formatToArgentinaCurrency(
      amount,
      decimalPlaces
    );
  }

  const calculateAmount = () => {
    const coinValue = Number.parseFloat(coinPrice);
    if (Number.isNaN(coinValue)) return "$ 0,00";
    return getAmountByPeriod(action) || 0;
  };

  const amountByPeriod = calculateAmount();


  const titleAmount = formatValue(amountByPeriod, 5);
  const displayedAmount = formatValue(amountByPeriod, 2)

  return (
    <div className="info-item" key={action}>
      <p>{label}</p>
      <p title={titleAmount || ""}>
        {displayedAmount.replace(/\,0+$/, "") || ""}
      </p>
    </div>
  );
}

export default Detail;
