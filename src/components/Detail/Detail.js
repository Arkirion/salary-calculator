import './Detail.scss';
import {toArgentinaCurrency} from '../../base/utils';



const Detail = (props) => {
  const calculateAmount = (action, money, divisor, coinValue) => {
    let periodAmount = 0;
    const weekDivisor = 4;
    const dayMultiplier = 8; // hours per day
    const yearMultiplier = 12; // amount of months on a year

    switch (action) {
      case 'hour':
        periodAmount = money / divisor
        break;
      case 'day':
        periodAmount = (money / divisor) * dayMultiplier
        break;
      case 'week':
        periodAmount = money / weekDivisor
        break;
      case 'month':
        periodAmount = money
        break;
      case 'year':
        periodAmount = money * yearMultiplier
        break;
    }
    return toArgentinaCurrency(periodAmount / parseFloat(coinValue) , 2);
  }

  return (
    <div className="info-item" key={props.detail.action}>
      <p>{props.detail.label}</p>
      <p>{ 
        calculateAmount(
          props.detail.action, props.money, props.divisor, props.coinValue
          ) || ''
        }
      </p>
    </div>
  )
}

export default Detail;
