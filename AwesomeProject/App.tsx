/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import { Camera } from 'expo-camera'
let camera: Camera | null

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [startCamera, setStartCamera] = useState<boolean>(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      //! start camera
      setStartCamera(true)
    } else {
      Alert.alert('Accesss denied')
    }
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <>
          <View style={{ flex: 1, width: '100%' }} />
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={__startCamera}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Take picture
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <SafeAreaView style={backgroundStyle}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <Header />
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={__startCamera}
                style={{
                  width: 130,
                  borderRadius: 4,
                  backgroundColor: '#14274e',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Take Picture
                </Text>
              </TouchableOpacity>
              <Camera
                style={{ flex: 1, width: '100%' }}
                ref={r => {
                  camera = r
                }}
              />
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
