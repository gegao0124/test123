export const UPDATE_DISCOUNTS = 'discounts:updateDiscounts'

export function updateDiscounts(newDiscount) {
    return {
        type: UPDATE_DISCOUNTS,
        payload: {
            code: newDiscount
        }
    }
}