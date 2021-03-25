import './Detail.scss';
import {toArgentinaCurrency} from '../../base/utils';

function Detail(props){
  const calculateAmount = ( decimalPlaces ) => {
    let periodAmount = 0;
    const weekDivisor = 4;
    const dayMultiplier = 8; // hours per day
    const yearMultiplier = 12; // amount of months on a year

    const periodCalculator = {
      'hour' : () => { return props.money / props.divisor },
      'day' : () => { return (props.money / props.divisor) * dayMultiplier },
      'week' : () => { return periodAmount = props.money / weekDivisor},
      'month' : () => {return  periodAmount = props.money },
      'year' : () => { return periodAmount = props.money * yearMultiplier },
    }
    const calculatedValue = periodCalculator[props.detail.action]();

    return toArgentinaCurrency(calculatedValue / parseFloat(props.coinValue) , decimalPlaces);
  }

  return (
    <div className="info-item" key={props.detail.action}>
      <p>{props.detail.label}</p>
      <p title={calculateAmount(5) || ''}>
        { 
          calculateAmount(2) || ''
        }
      </p>
    </div>
  )
}

export default Detail;
