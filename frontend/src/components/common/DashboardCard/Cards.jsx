import "./Cards.css"
import { cardsData } from "./Data"

import DashCard from "./DashCard"


const Cards = () => {
    return (
      <div className="Cards">
        {cardsData.map((card, id) => {
          return (
            <div className="parentContainer" key={id}>
              <DashCard
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
              />
            </div>
          );
        })}
      </div>
    );
  };
  
  export default Cards;