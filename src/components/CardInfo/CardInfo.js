import './CardInfo.scss';

function CardInfo (props) {
  return (
    <article className="info-wrapper">
      {props.header}
      <div className="info-item-list">
        {props.details}
      </div>
    </article>
  );
}

export default CardInfo;