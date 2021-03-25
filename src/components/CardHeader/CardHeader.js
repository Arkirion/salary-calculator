import './CardHeader.scss';


function CardHeader (props){
  return (
    <header className={`coinValue ${props.coinInfo.color} `}>
      <div>
        {props.coinInfo.label}
      </div>
      <div>
        $ {props.coinValue}
      </div>
    </header>
  )
}

export default CardHeader