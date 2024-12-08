import appleImage from '../assets/images/apples.png';
import orangeImage from '../assets/images/oranges.png';
import mangoImage from '../assets/images/mangos.png';


export const fruits = [
  {
    id: 0,
    name: 'apple',
    price: 2,
    image: appleImage,
  },
  {
    id: 1,
    name: 'orange',
    price: 1.5,
    image: orangeImage,
  },
  {
    id:2,
    name: 'mango',
    price: 5,
    image: mangoImage,
  },
];



export const mockApi = {
  getStockLevels: async () => {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
    return {
      apple: 6,
      orange: 1,
      mango: 0,
    };
  }
};

export default mockApi;
