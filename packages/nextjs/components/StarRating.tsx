import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfAlt, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRating = ({ score }) => {
  const fullStars = Math.floor(score);
  const decimalStar = score - fullStars;
  const emptyStars = 5 - fullStars - (decimalStar > 0 ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={i} icon={solidStar} />
      ))}
      {decimalStar > 0 && <FontAwesomeIcon icon={faStarHalfAlt} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon key={fullStars + i + 1} icon={regularStar} />
      ))}
    </div>
  );
};

export default StarRating;
