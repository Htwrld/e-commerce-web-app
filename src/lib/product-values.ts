// EXCHANGE_RATE_NGN_PER_USD is a site-wide NGN-per-USD rate (e.g. 1500 means
// ₦1,500 = $1). WooCommerce remains the payable price source.
export function getWooCommerceProductValues(product: {
    shop_price?: unknown
    stock_quantity?: unknown
    in_stock?: unknown
    manage_stock?: unknown
    backorders_allowed?: unknown
    stock_status?: unknown
}) {
    const price = Number(product.shop_price)
    const rate = Number(process.env.EXCHANGE_RATE_NGN_PER_USD)
    const validPrice =
        product.shop_price !== null &&
        product.shop_price !== undefined &&
        product.shop_price !== "" &&
        Number.isFinite(price) &&
        price >= 0
    const quantity = product.stock_quantity
    return {
        price: validPrice ? price.toFixed(2) : "0",
        usd_price: validPrice && Number.isFinite(rate) && rate > 0 ? (price / rate).toFixed(2) : "",
        in_stock: product.in_stock === true,
        stock_quantity: typeof quantity === "number" && Number.isFinite(quantity) ? quantity : null,
        manage_stock: product.manage_stock === true,
        backorders_allowed: product.backorders_allowed === true,
        stock_status:
            typeof product.stock_status === "string" ? product.stock_status : "outofstock",
    }
}
