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
  ImageBackground,
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

const CameraPreview = ({ photo }: any) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      />
    </View>
  )
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [startCamera, setStartCamera] = useState<boolean>(false)
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)

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

  const __takePicture = async () => {
    if (!camera) {
      return
    }
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <>
          <View style={{ flex: 1, width: '100%' }} />
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} />
          ) : (
            <Camera
              style={{ flex: 1 }}
              ref={r => {
                camera = r
              }}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
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
