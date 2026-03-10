import { Star } from 'lucide-react';

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange(star)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          disabled={readonly}
        >
          <Star
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>
      ))}
      {rating && (
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
          ({rating}/5)
        </span>
      )}
    </div>
  );
};

export default StarRating;