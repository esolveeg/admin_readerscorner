export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      headers: {
        common: {
          Accept: 'application/json',
          ContentType: 'application/json',
        }
      }
    })
  
    // Set baseURL to something different
    api.setBaseURL(process.env.API_URL)
  
    // Inject to context as $api
    inject('api', api)
  }
  