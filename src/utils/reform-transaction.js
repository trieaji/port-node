export const reformTransaction = (transactions) => {
    return {
        id: transactions.id,
        total: transactions.total,
        status: transactions.status,
        customer_name: transactions.customer_name,
        customer_email: transactions.customer_email,
        snap_token: transactions.snap_token,
        snap_redirect_url: transactions.snap_redirect_url,
        payment_method: transactions.payment_method,
        products: transactions.transactions_item.map((transactionItem) => ({
            id: transactionItem.products_id,
            name: transactionItem.products_name,
            price: transactionItem.price,
            quantity: transactionItem.quantity,
            image: transactionItem.products.image
        }))
    }
}