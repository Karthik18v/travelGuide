import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCard from './TravelCard/index'
import {
  MainContainer,
  Heading,
  TitleContainer,
  TravleListContainer,
  Horizontal,
  TravelList,
} from './styledComponents'
import './App.css'

// Replace your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'IN PROGRESS',
}

class App extends Component {
  state = {
    placesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPlacesDetails()
    this.setState({apiStatus: apiStatusConstants.inprogress})
  }

  getPlacesDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updateData = data.packages.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
      description: eachItem.description,
    }))
    console.log(updateData)
    this.setState({
      placesList: updateData,
      apiStatus: apiStatusConstants.success,
    })
  }

  successView = () => {
    const {placesList} = this.state
    return (
      <>
        <TravelList>
          {placesList.map(eachCountry => (
            <li key={eachCountry.id}>
              <TravelCard eachCountry={eachCountry} />
            </li>
          ))}
        </TravelList>
      </>
    )
  }

  LoaderView = () => <Loader type="ThreeDots" height="22" />

  renderAllTravelList = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.LoaderView()
      case apiStatusConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <MainContainer>
        <TitleContainer>
          <Heading>Travel Guide</Heading>
          <Horizontal />
        </TitleContainer>
        <TravleListContainer>{this.renderAllTravelList()}</TravleListContainer>
      </MainContainer>
    )
  }
}

export default App
