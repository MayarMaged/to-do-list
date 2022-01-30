import axios from 'axios';

// I used axios.create to create an instance of axios each time this component gets called

export default axios.create({
    baseURL: "http://localhost:3006/"
})