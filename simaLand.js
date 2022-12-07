import DATABASE from "./DB.js"
import SLUG from "slug"
class SIMA {
    async addProductsTobase(obj, page) {
        const DB = new DATABASE
        await DB.connect()


        for (const item of obj) {
            let balance = item.balance
            let id = item.id
            let price = item.price
            let article = item.sid
            let dat = this.curdat()
            let photo = item.base_photo_url
            let name = item.name
            let category_id = item.category_id
            let min_qty = item.minimum_order_quantity
            let brand = item.trademark_id
            let is_markdown = item.is_markdown ? 1 : 0; // sima это уценка 
            let parent_item_id = Number(item.parent_item_id)
            let url = item.slug
            let description = item.description

            let query = `update Vproducts set price=${price}, brand=${brand}, min_qty=${min_qty}, balance='${balance}', update_dat='${dat}' where itemId=${id} limit 1`
          //  console.log(query);
            let res = await DB.dbquery(query)
            if (res.affectedRows == 0) {
                if (name.length < 190) {
                    let query = `insert into Vproducts set 
                    itemId=${id}, 
                    name='${name}', 
                    brand=${brand},
                    price=price=${price}, 
                    balance='${balance}', 
                    country_id=0,
                    hide=0,
                    is_adult=0,
                    price_max = 100,
                    unit_id=0,
                    is_protected=0,
                    article=${article}, 
                    parent_item_id=${parent_item_id},
                    min_qty=${min_qty},
                    category_id=${category_id}, 
                    base_photo_url='${photo}', 
                    update_dat = '${dat}',
                    url='${url}',
                    is_markdown=${is_markdown}`
                  //  console.log(query);
                    res = await DB.dbquery(query)
                    await DB.dbquery(`insert into sima_logs set mess='Добавил товар ${res.insertId}', dat=now(), tim=now()`)
                    if (res.insertId > 0) {
                      //  console.log('description', description);
                        let query = `insert into VproductsDescriptions set description='${description}', product=${res.insertId}`
                     //   console.log(query);
                        await DB.dbquery(query)
                    }
                }
            }

        }

        await DB.dbquery(`insert into sima_logs set mess='Обработка ${page}', dat=now(), tim=now()`)
        await DB.dbclose()
        return "ok"
    }
    async addSectionsTobase(obj, page) {
        const DB = new DATABASE
        await DB.connect()


        for (const item of obj) {
            let id = item.id // sima id записи
            let name = this.strForDb(item.name) // sima id товара
            let is_leaf = item.is_leaf ? 1 : 0 // sima id категори
            let slugName = item.slug;
            let level = item.level;
            let icon = item.icon;
            let parent = item.path.split('.')

            if (parent.length > 1) {
                parent = Number(parent[parent.length - 2])
            } else {
                parent = Number(parent[0])
            }
            let url = SLUG(name)


            let query = `update Vsections set name='${name}', url='${url}', parent=${parent}, icon='${icon}', is_leaf=${is_leaf}, slug='${slugName}', level=${level} where itemId=${id} limit 1`
           // console.log(query);
            let res = await DB.dbquery(query)
            if (res.affectedRows == 0) {
                if (name.length < 190) {
                    let query = `insert into Vsections set name='${name}', url='${url}', parent=${parent}, icon='${icon}', is_leaf=${is_leaf}, slug='${slugName}', level=${level}`
                 //   console.log(query);
                    res = await DB.dbquery(query)
                    await DB.dbquery(`insert into sima_logs set mess='Добавил категорию. ${res.insertId}', dat=now(), tim=now()`)
                }
            }

        }

        await DB.dbquery(`insert into sima_logs set mess='Обработка категории ${page}', dat=now(), tim=now()`)
        await DB.dbclose()
        return "ok"
    }

    curdat() {
        var d = new Date();
        var curr_date = '0' + d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        return curr_year + "-" + curr_month + "-" + curr_date
    }
    strForDb(str) {
        return str.replaceAll("'", '&#8242;').replaceAll('"', '&#8242;')
    }
}

export default SIMA



