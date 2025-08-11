export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
): number => {
  return price - (price * discountPercentage) / 100;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const extractShippingFee = (shippingInfo: string): number => {
  const match = shippingInfo.match(/\$(\d+\.\d{2})/);
  return match ? parseFloat(match[1]) : 0;
};
