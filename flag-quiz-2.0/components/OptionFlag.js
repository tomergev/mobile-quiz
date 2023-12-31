import { 
  Image,
  Pressable,
} from 'react-native'
import correctJingle from '../audio/correct.mp3'
import incorrectJingle from '../audio/incorrect.mp3'
import useSound from '../hooks/useSound'

const OptionFlag = ({ 
  answer,
  choice,
  choiceIdsSelected,
  currentIndex,
  numOfIncorrectSelections,
  screenHeight,
  setChoiceIdsSelected,
  setCurrentIndex,
  setNumOfIncorrectSelections,
}) => {
  const playCorrectJingle = useSound(correctJingle)
  const playIncorrectJingle = useSound(incorrectJingle)
  
  const createStyle = ({ pressed }) => {
    const style = { 
      backgroundColor: '#495057',
      borderRadius: 10,
      flex: 1, 
      margin: screenHeight / 200,
    }
    
    const isChoiceSelected = choiceIdsSelected.includes(choice?.id)
    if (isChoiceSelected) {
      const isChoiceAnswer = choice?.id === answer?.id
      style.backgroundColor = isChoiceAnswer ? '#42f548' : 'red'
      style.opacity = 0.75
    }

    if (pressed) style.opacity = 0.5

    return style
  }
  const onPress = () => {
    setChoiceIdsSelected([...choiceIdsSelected, choice?.id])

    if (choice?.id === answer?.id) {
      playCorrectJingle()
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setChoiceIdsSelected([])
      }, 1000)
    } else {
      playIncorrectJingle()
      setNumOfIncorrectSelections(numOfIncorrectSelections + 1)
    }
  }

  return (
    <Pressable
      android_ripple={{ borderless: false }}
      disabled={choiceIdsSelected.includes(choice?.id)}
      onPress={onPress}
      style={createStyle}
    >
      <Image             
        resizeMode='contain'
        source={{ uri: choice?.flag }} 
        style={{ flex: 1 }}
      />
    </Pressable>
  )
}

export default OptionFlag