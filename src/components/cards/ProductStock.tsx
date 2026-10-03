import type { Product } from "@/src/action/productController"

export function ProductStock({ product }: { product: Product }) {
    const label = !product.in_stock
        ? "Out of stock"
        : product.stock_status === "onbackorder" ||
            (product.backorders_allowed &&
                product.stock_quantity !== null &&
                product.stock_quantity <= 0)
          ? "Available on backorder"
          : product.manage_stock && product.stock_quantity !== null
            ? `${product.stock_quantity} in stock`
            : "In stock"
    return (
        <p className="mb-3 text-xs" role="status">
            {label}
        </p>
    )
}
