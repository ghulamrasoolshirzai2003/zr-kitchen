import { restaurantInfo } from '../data/menuData'
import { FoodpandaIcon, GrabFoodIcon } from './icons'

export default function DeliveryBadges({ className = '' }) {
  const { foodpanda, grabfood } = restaurantInfo.delivery

  return (
    <div className={`delivery-badges ${className}`.trim()}>
      <a
        href={foodpanda}
        target="_blank"
        rel="noopener noreferrer"
        className="delivery-badge delivery-badge--foodpanda"
        aria-label="Order on foodpanda"
        title="Order on foodpanda"
      >
        <FoodpandaIcon />
      </a>
      <a
        href={grabfood}
        target="_blank"
        rel="noopener noreferrer"
        className="delivery-badge delivery-badge--grab"
        aria-label="Order on GrabFood"
        title="Order on GrabFood"
      >
        <GrabFoodIcon />
      </a>
    </div>
  )
}
