
//Woocommerce
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"


const key_client = "ck_33745d70c96b69ba7b9b01acb2dcb34eddfb845f"
const secret_key = "cs_f6b672cee741dd9af5dce713dbd150bae2f241a1"

export const Woocommerce = new WooCommerceRestApi({
    url: "https://xn--consumeuble-7db.cl/",
    consumerKey: key_client,
    consumerSecret: secret_key,
    version:"wc/v3",
    axiosConfig: { headers: {} }
})


