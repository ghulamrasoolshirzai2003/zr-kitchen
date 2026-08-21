import { restaurantInfo } from '../data/menuData'

export default function DeliveryBadges({ className = '' }) {
  const { foodpanda, grabfood } = restaurantInfo.delivery

  return (
    <div className={`delivery-badges ${className}`.trim()}>
      <a
        href={foodpanda}
        target="_blank"
        rel="noopener noreferrer"
        className="delivery-badge delivery-badge--foodpanda"
      >
        order on foodpanda
      </a>
      <a
        href={grabfood}
        target="_blank"
        rel="noopener noreferrer"
        className="delivery-badge delivery-badge--grab"
      >
        order on GrabFood
      </a>
    </div>
  )
}
