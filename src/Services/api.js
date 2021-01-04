import fetchApi from "./config";

const METHOD = {
    POST: 'post',
    GET: 'get',
    PUT: 'put',
    DELETE: 'delete',
};


// export const removeAccount = () => () => {
//     return fetchApi(`/api/remove-user`, {}, METHOD.GET)
// }

// export const checkExistsMail = ({ email }) => () => {
//     return fetchApi(`/api/check-exists-mail`, { email }, METHOD.POST)
// }
export const getToplistProducts = () => () => {
    return fetchApi(`/products/get-toplist-products`, {}, METHOD.GET)
}

export const getAllCampaign = () => () => {
    return fetchApi(`/products/get-all-campaign`, {}, METHOD.GET)
}

export const getAllProductIdCampaign = (idCampaign) => () => {
    console.log(`aawdawdd ${idCampaign}`);

    return fetchApi(`/products/get-all-productByCampaignID/${idCampaign}`, {}, METHOD.GET)
}

export const getAllProductNewPrice = () => () => {

    return fetchApi(`/products/get-all-product-has-new-price`, {}, METHOD.GET)
}

export const getInfoProductByID = (idProduct) => () => {

    return fetchApi(`/products/info/${idProduct}`, {}, METHOD.GET)
}

export const getProductSameCategory = (idProduct) => () => {

    return fetchApi(`/products/get-product-same-category/${idProduct}`, {}, METHOD.GET)
}

export const getRecommendProductBySimilarity = () => () => {

    return fetchApi(`/products/get-recommend-product-by-similarity`, {}, METHOD.GET)
}

export const getRecommendProductBySimilarity2 = () => () => {

    return fetchApi(`/products/get-recommend-product-by-similarity2`, {}, METHOD.GET)
}

export const addProductToCart = (data) => () => {
    
    return fetchApi(`/orders/new`, data, METHOD.POST)
}

export const getAllProductInCartNotPay = () => () => {
    return fetchApi(`/products/get-all-product-in-cart-notPay`, data, METHOD.GET)
}

export const handlePostNewCmt = (data) => () => {
    return fetchApi(`/comments/new-comment`, data, METHOD.POST)
}

export const getAllCategory = () => () => {
    return fetchApi(`/categories`, {}, METHOD.GET)
}

export const getAllProductByCategoryName = (nameCategory) => () => {
    return fetchApi(`/categories/${nameCategory}`, {}, METHOD.GET)
}

export const setNewClickProduct = (idProduct) => () => {
    return fetchApi(`/products/click/${idProduct}`, {}, METHOD.GET)
}

export const findProduct = (key) => () => {
    return fetchApi(`/products/find/${key}`, {}, METHOD.GET)
}






