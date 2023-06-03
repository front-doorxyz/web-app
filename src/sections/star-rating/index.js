import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ score }) => {
  const fullStars = Math.floor(score);
  const halfStar = score - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={i} icon={solidStar} />
      ))}
      {halfStar && <FontAwesomeIcon icon={["fas", "star-half-alt"]} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon key={fullStars + i} icon={regularStar} />
      ))}
    </div>
  );
};
export default StarRating;