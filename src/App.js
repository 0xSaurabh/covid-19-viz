import React from 'react';
import styled from 'styled-components';

import Nav from './components/Nav';
import Visualization from './components/Vizualization';


// --> Styled components start <--
/* styled component for footer text*/
const Text = styled.p`
  font-family: Montserrat;
  font-size: 14px;

  text-align: center;

  margin: 0 auto;

  margin-top: 30px;
  margin-bottom: 20px;

  max-width: 80%;

  overflow-wrap: break-word;

  a{
    color: #000;
  }
`;
// --> Styled components ends <--

// --> Parent/Root component to every component <--
class App extends React.Component{

    constructor(props){
        super(props);

        // App component's state
        //contains data related to visualizations
        this.state = {
            data: null
        }

        this.loadData = this.loadData.bind(this);
    }

    // to load data once component is loaded
    componentDidMount(){
        /* calling fetchGlobalData function after component is mounted. */
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords;
                console.log(latitude);
                const REV_GEOCODE_API = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
                fetch(REV_GEOCODE_API)
                    .then(response => response.json())
                    .then(data => this.loadData(data.countryCode))
                    .then(data => setTimeout(() => this.setState({data}),750))
                    .catch(err => console.err(err));
            })
        } else {
            this.fetchGlobalData()
                .then(data => setTimeout(() => this.setState({data}),750))
                .catch(err => console.error(err));
        }
    }

    // calls either fetchData and fetchGlobalData depending upon parameter passed (countryCode)
    loadData(countryCode){
        this.setState({data: null});
        if(countryCode === ''){
            // calls fetchGlobalData to fetch Global Data
            this.fetchGlobalData()
                .then(data => setTimeout(() => this.setState({data}),750))
                .catch(err => console.error(err));
        } else {
            // calls fetchData to fetch data of a country
            this.fetchData(countryCode)
                .then(data => setTimeout(() => this.setState({data}),750))
                .catch(err => console.error(err));
        }
    }

    // fetches Global Data
    async fetchGlobalData(){
        const API = `https://corona-api.com/timeline`;
        const response = await fetch(API);
        if(response.status !== 200) {
            throw new Error('Resource not found');
        }
        let data = await response.json();

        // getting data in a similar format as country data
        data = data.data;
        data = {name:'Global',timeline: data};
        data = {data};

        return data;
    }

    // fetches data of a country
    async fetchData(countryCode){
        const API = `https://corona-api.com/countries/${countryCode}?include=timeline`;
        const response = await fetch(API);
        if(response.status !== 200) {
            throw new Error('Resource not found');
        }
        const data = await response.json();
        return data;
    }

    // returns JSX of child components for rendering
    render(){
        return (
            <div className="App">
                <Nav loadData={this.loadData}/>
                <Visualization data={this.state.data}/>
                {/* Footer Text*/}
                <Text>
                    This website uses data from APIs graciously provided by <a href='https://about-corona.net' rel="noopener noreferrer" target='_blank'>about-corona.net</a>, <a href='https://restcountries.eu/' rel="noopener noreferrer" target='_blank'>Rest Countries</a> and <a href='https://restcountries.eu/' rel="noopener noreferrer" target='_blank'>Big Data Cloud</a>.</Text>
                <Text>made with ❤ by <a href='https://thecodelife.science.blog' rel="noopener noreferrer" target='_blank'>@sksuryan</a></Text>
            </div>
        );
    }
}

export default App;
