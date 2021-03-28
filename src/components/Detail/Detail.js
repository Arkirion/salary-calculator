import './Detail.scss';
import {formatToArgentinaCurrency} from '../../base/utils';

function Detail(props){
  console.count(props.action);

  const calculateAmountByPeriod = (action) =>{
    let periodAmount = 0;
    // TODO : evualate add 'Period' enum 
    const weeksPerMonth = 4;
    const hoursPerDay = 8;
    const monthsPerYear = 12; 
    const periodCalculator = {
      'hour' : () => { return props.money / props.divisor },
      'day' : () => { return (props.money / props.divisor) * hoursPerDay },
      'week' : () => { return periodAmount = props.money / weeksPerMonth},
      'month' : () => {return  periodAmount = props.money },
      'year' : () => { return periodAmount = props.money * monthsPerYear },
    }
    return periodCalculator[action]();
  }

  const calculateAmount = ( decimalPlaces ) => {
    const coinValue = Number.parseFloat(props.coinValue);
    if ( Number.isNaN(coinValue)) return "$ 0,00";
    const calculatedValue = calculateAmountByPeriod(props.detail.action);
    const amountDividedByCoinValue =  calculatedValue / coinValue.toFixed();
    const formatedValue = formatToArgentinaCurrency( amountDividedByCoinValue , decimalPlaces)
    return formatedValue;
  }

  return (
    <div className="info-item" key={props.detail.action}>
      <p>{props.detail.label}</p>
      <p title={calculateAmount(5)|| ''}>
        { 
          calculateAmount(2) || ''
        }
      </p>
    </div>
  )
}

export default Detail;
