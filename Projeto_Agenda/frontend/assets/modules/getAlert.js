export default function getAlert(url) {
  setTimeout(() => {
    axios.get(`/api/advice/${url}`)
      .then(response => {
        let text = '';
        for (const key in response.data){
          if (response.data[key]) {
            text += response.data[key] + '\n'
          }
        }
        if (text !== ''){alert(text);}
      })
      .catch(error => console.log(error))
  }, 200)
}
