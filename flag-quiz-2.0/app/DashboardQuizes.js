import { 
  useLocalSearchParams, 
  useNavigation,
} from 'expo-router'
import { 
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View, 
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import countries from '../countries'
import createQuiz from '../utils/createQuiz'

const DashboardQuizes = () => {
  const { continent, label } = useLocalSearchParams() || {}
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { 
    height: screenHeight,
    width: screenWidth, 
  } = useWindowDimensions()

  const countriesFilteredByContinent = countries
    .filter((country) => country.continents.includes(continent))
    .sort(() => Math.random() - 0.5)
  const quiz = createQuiz(countriesFilteredByContinent)

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
        {label || continent}
      </Text>
      
      <Pressable
        onPress={() => navigation.navigate('CountryNameQuiz', { quiz: JSON.stringify([quiz[0], quiz[1], quiz[2]]) })}
        style={{ 
          backgroundColor: '#495057',
          borderRadius: 10,
          flexDirection: 'row', 
          height: screenHeight / 10,
          margin: screenHeight / 100,
        }}
      >
        <Image             
          resizeMode='contain'
          source={{ uri: countriesFilteredByContinent[0]?.flags?.png }} 
          style={{ 
            height: '100%',
            width: screenWidth / 5,
          }}
        />
        <View 
          style={{ 
            flex: 1, 
            justifyContent: 'center',
          }}
        >
          <Text 
            style={{ 
              alignSelf: 'center',
              color: 'white',
              fontSize: 15, 
            }}
          >
            4 Countries
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('FlagQuiz', { quiz: JSON.stringify([quiz[0], quiz[1], quiz[2]]) })}
        style={{ 
          backgroundColor: '#495057', 
          borderRadius: 10,
          flexDirection: 'row', 
          height: screenHeight / 10,
          margin: screenHeight / 100,
        }}
      >
        <View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image             
              resizeMode='contain'
              source={{ uri: countriesFilteredByContinent[1]?.flags?.png }} 
              style={{ 
                height: '100%',
                marginRight: screenWidth / 100,
                width: screenWidth / 10,
              }}
            />
            <Image             
              resizeMode='contain'
              source={{ uri: countriesFilteredByContinent[2]?.flags?.png }} 
              style={{ 
                height: '100%',
                width: screenWidth / 10,
              }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image             
              resizeMode='contain'
              source={{ uri: countriesFilteredByContinent[3]?.flags?.png }} 
              style={{ 
                height: '100%',
                marginRight: screenWidth / 100,
                width: screenWidth / 10,
              }}
            />
            <Image             
              resizeMode='contain'
              source={{ uri: countriesFilteredByContinent[4]?.flags?.png }} 
              style={{ 
                height: '100%',
                width: screenWidth / 10,
              }}
            />
          </View>
        </View>
        <View 
          style={{ 
            flex: 1, 
            justifyContent: 'center',
          }}
        >
          <Text 
            style={{ 
              alignSelf: 'center',
              color: 'white',
              fontSize: 15, 
            }}
          >
            4 Flags
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default DashboardQuizes