import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductDetails } from "../components/ProductDetails";
import type { Product } from "../types/ProductTypes";
import { Loading } from "../components/Loading";

export function ProductDetailsPage() {

  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {

    async function getProduct() {

      const response = await fetch(
        `https://fakestoreapi.com/products/${id}`
      );

      const data = await response.json();

      setProduct(data);
    }

    getProduct();

  }, [id]);

  if (!product) {
    return <Loading/>;
  }

  return (
    <ProductDetails
      product={product}
    />
  );
}