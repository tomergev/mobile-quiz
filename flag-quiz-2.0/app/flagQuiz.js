import { useState } from 'react'
import { 
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text, 
  View, 
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import countries from '../countries'
import createQuiz from '../utils/createQuiz'
import shuffleArray from '../utils/shuffleArray'

const countriesAfrica = countries.filter(c => c.continents.includes('Europe'))
const quizAfricanCountries = createQuiz(shuffleArray(countriesAfrica))
const styles = StyleSheet.create({
  flag: {
    flex: 1,
    height: 200,
  },
})

const FlagQuiz = () => {
  const insets = useSafeAreaInsets()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [choiceIdSelected, setChoiceIdSelected] = useState(null)

  return (
    <View style={{ paddingTop: insets.top }}>
      <Text style={{ textAlign: 'center' }}>{quizAfricanCountries[currentIndex].answer.name}</Text>
      
      <FlatList
        data={quizAfricanCountries[currentIndex].choices}
        horizontal={false}  
        keyExtractor={c => c.name}
        numColumns={2}
        renderItem={({ item: choice }) => {
          const choiceStyle = { ...styles.flag }
          const isChoiceSelected = choice.id === choiceIdSelected
          if (isChoiceSelected) {
            const isChoiceAnswer = choice.id === quizAfricanCountries[currentIndex]?.answer?.id
            choiceStyle.borderColor = isChoiceAnswer ? 'green' : 'red'
            choiceStyle.borderWidth = 5
          }
          return <Pressable
            onPress={() => {
              setChoiceIdSelected(choice.id)

              if (choice.id === quizAfricanCountries[currentIndex]?.answer?.id) {
                setTimeout(() => {
                  setCurrentIndex(current => current + 1)
                  setChoiceIdSelected(null)
                }, 1200)
              }
            }}
            style={choiceStyle}
          >
            <Image             
              resizeMode="center"
              source={{ uri: choice.flag }} 
              style={styles.flag}
            />
          </Pressable>
        }}
      />
    </View>
  )
}

export default FlagQuiz