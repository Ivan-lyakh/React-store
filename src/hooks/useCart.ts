
import { useDispatch } from "react-redux"
import { supabase } from "../supaBaseClient"
import { useSelector } from "react-redux"
import { setCart } from "../sliceStore/Cart"



export const useCart = () => {


  const dispatch = useDispatch()

  const user = useSelector(
    (state: any) => state.user.users
  );

  const addProductCart = async (userId: string, productId: number) => {
    const { error } = await supabase
      .from("Cart")
      .insert({
        user_id: userId,
        product_id: productId,
        quantity: 1
      })

    if (error) throw new Error(error.message)
  }

  const getProductCart = async (userId: string, productId: number) => {
    const { data, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)

    if (error) throw new Error(error.message)

    return data
  }

  const updateQuantity = async (
    cartId: string,
    quantity: number
  ) => {

    const { error } = await supabase
      .from("Cart")
      .update({ quantity })
      .eq("id", cartId)

    if (error) throw new Error(error.message)
  }

  async function check(userId: string, productId: number) {

    const products = await getProductCart(userId, productId)

    if (products.length === 0) {
      await addProductCart(userId, productId)
      await loadCart()
      return
    }

    const product = products[0]

    if (product.quantity >= 5) {
      throw new Error("Максимальное количество товара в корзине: 5")
    }

    await updateQuantity(
      product.id,
      product.quantity + 1
    )

    await loadCart()
  }

  const loadCart = async () => {


    if (!user) return;

    const { data, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
      return;
    }

    dispatch(setCart(data));
  };

  const deleteProductCart = async (cartId: string) => {

    const { data, error } = await supabase
      .from("Cart")
      .delete()
      .eq("id", cartId)

    console.log("DELETE RESULT:", data)
    console.log("DELETE ERROR:", error)


    if (error) {
      throw new Error(error.message)
    }

  }

  const removeProduct = async (
    userId: string,
    productId: number
  ) => {


    console.log("Удаляем товар:", productId)


    const products = await getProductCart(
      userId,
      productId
    )

    console.log("Найдены записи:", products)

    if (products.length === 0) {
      console.log("Запись не найдена")
      return
    }

    const product = products[0]

    console.log("Запись корзины:", product)


    if (product.quantity === 1) {

      console.log("DELETE", product.id)

      await deleteProductCart(product.id)

    } else {

      console.log(
        "UPDATE",
        product.quantity,
        "->",
        product.quantity - 1
      )

      await updateQuantity(
        product.id,
        product.quantity - 1
      )

    }

    await loadCart()
  }

  const actionCart = { getProductCart, addProductCart, check, loadCart, removeProduct }


  return { actionCart, }

}