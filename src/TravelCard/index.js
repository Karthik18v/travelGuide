import {
  TitleCardContainer,
  Image,
  DescriptionContainer,
  Name,
  Description,
} from './styledComponents'

const TravelCard = props => {
  const {eachCountry} = props
  const {name, imageUrl, description} = eachCountry
  return (
    <TitleCardContainer>
      <Image src={imageUrl} alt="thumbnail" />
      <DescriptionContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </DescriptionContainer>
    </TitleCardContainer>
  )
}

export default TravelCard
