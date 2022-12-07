import HttpRequers from "./HttpRequers.js"
import SIMA from "./simaLand.js"
class PARSER {
    async getProducts() {
        const HR = new HttpRequers
        const SIMALAND = new SIMA
        let STOP = false
        let page = 20240
        let promices = []
        while (!STOP) {
            
            let req = await HR.get(`https://www.sima-land.ru/api/v5/item?p=${page}`)
            
            if(!Object.keys(req).includes('data')){
                console.log("TRABL")
                console.log(req)
            }

            if (req.data.length == 0 || page == 700000) {
                STOP = true
                return
            }
            promices.push(SIMALAND.addProductsTobase(req.data, page))
            

          
            if(promices.length==5) {
                await Promise.all(promices).
                    then(values => {
                        console.log(values);
                    });
                console.log('NEXT');
                promices = []
            }
            page++
        }

        console.log("Обработку товаров закончил !!!");
    }

    async getSections() {
        const HR = new HttpRequers
        const SIMALAND = new SIMA
        let STOP = false
        let page = 1
        let promices = []
        while (!STOP) {
            
            let req = await HR.get(`https://www.sima-land.ru/api/v5/category?p=${page}`)
       
            if (req.data.length == 0 || page == 700000) {
                STOP = true
                return
            }
            promices.push(SIMALAND.addSectionsTobase(req.data, page))
            
          
            if(promices.length==5) {
                await Promise.all(promices).
                    then(values => {
                        console.log(values);
                    });
                console.log('NEXT');
                promices = []
            }
            page++
        }

        console.log("Обработку товаров категорий !!!");
    }
}

export default PARSER