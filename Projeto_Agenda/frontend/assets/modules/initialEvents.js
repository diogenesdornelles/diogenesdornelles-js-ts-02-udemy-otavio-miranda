export default async function initialEvents() {
  try {
    let response;
    response = await axios.get('/api/events/agenda');
    if (response.data.length === 0) {
      response = [{}]
      return response;
    } else {
      return response.data;
    }
  } catch (e) {
    console.log(e)
  }
}
