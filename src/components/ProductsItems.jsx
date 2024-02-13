import SingleProduct from "./SingleProduct";
import { CartState } from "../context/Context";

const ProductsItems = () => {
  // const cartStateResult = CartState() || {};
  // const {
  //   state: { products },
  //   productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  // } = cartStateResult;
  const cartStateResult = CartState() || {};
  const {
    state: { products } = { products: [] },
    productState: {
      sort = "default",
      byStock = false,
      byFastDelivery = false,
      byRating = 0,
      searchQuery = "",
    } = {},
  } = cartStateResult;

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  return (
    <>
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </>
  );
};

export default ProductsItems;
