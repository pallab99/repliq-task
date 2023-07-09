import axios from 'axios';

const getAllProducts = async () => {
  try {
    const response = await axios.get(
      'https://pallab99.github.io/data/products.json' 
    );
    return { data: response.data};
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getAllProducts;
