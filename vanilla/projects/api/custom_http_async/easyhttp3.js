class EasyHttp {

  // Make an HTTP GET Request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  // Make POST Request
  async post(url, data) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const resData = await response.json();
      return resData;

  }

    // Make UPDATE Request
    async put(url, data) {

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        const resData = await response.json();
        return resData;
    }

    // Make DELETE Request
    async delete(url) {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        })
        const resData = await 'Resource Deleted';
        return resData
    }
}