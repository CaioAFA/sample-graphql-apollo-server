export const getErrorFromRawMessage = (message) => {
  try{
    return JSON.parse(message.substring(message.indexOf('{')))['response']['errors'][0]['message']
  }
  catch(e){
    console.log(e)
    return 'Message parse error'
  }
}