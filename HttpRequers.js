import axios from "axios"
const SIMATOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Njg0MzAyOTgsIm5iZiI6MTY2ODQzMDI5OCwiZXhwIjoxNjk5OTY2Mjk4LCJqdGkiOjUxNTU1MDN9.73zWQzMnj576e9lPmFK0wZnNtXbxd5vO7r2qbn05ie8'
class HR {
    async get(url) {
        let response = {
            data: []
        }
        try {
            response = await axios.get(url, {
                timeout: 5000,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": SIMATOKEN
                }
            })
            return response
            
        } catch {
            console.log('request repet')
            try {
                response = await axios.get(url, {
                    timeout: 5000,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": SIMATOKEN
                    }
                })
                return response
                
            } catch {
                try {
                    response = await axios.get(url, {
                        timeout: 5000,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": SIMATOKEN
                        }
                    })
                    return response                    
                }  catch {
                    
                }
            }
        }
    }
}

export default HR