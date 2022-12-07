
import parser from "./parser.js"



(async () => {
    const PRSR = new parser 
    await PRSR.getProducts()
    await PRSR.getSections()
})()


