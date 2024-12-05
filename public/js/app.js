console.log('Server Side Javascript is called!')



const weatherForm = document.querySelector('form')
const selectedLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = selectedLocation.value

    fetch('http://localhost:3000/weather?query='+location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
                return
            }
            console.log(data.region)
            messageOne.textContent = 'Region: '+data.region+', Country: '+data.country+', Temprature:  '+data.temparature+', Weather Status: '+data.weatherDescription
       })
    })

    //console.log('location', location)
})