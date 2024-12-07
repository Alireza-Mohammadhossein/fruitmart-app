import React from 'react';

interface FruitCardProps {
  name: string;
  price: number;
  image: string;
  stock: number | undefined;
  loading: boolean;
  onAddToCart: (name: string, price: number) => void;
}

const FruitCard: React.FC<FruitCardProps> = ({ name, price, image, stock, loading, onAddToCart }) => {
  
  return (
    <div className="shop__item">
      <div className="shop__item__img">
        <img src={image} alt={name} />
      </div>

      <h3 className="shop__item__name">{name}</h3>

      <p className="shop__item__info">Produced by organic materials</p>

      <p className="shop__item__info">Price: ${price}</p>

      <p className="shop__item__info">Stock: {loading ? 'Loading...' : stock}</p>

      <div className="shop__item__action">
        {!loading && (
          <button
            className="btn btn--primary"
            disabled={stock === 0}
            onClick={() => onAddToCart(name, price)}
          >
            {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FruitCard;
