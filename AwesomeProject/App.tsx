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

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
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
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}>
                Re-take
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [startCamera, setStartCamera] = useState<boolean>(false)
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  // eslint-disable-next-line prettier/prettier
  const [flashMode, setFlashMode] = useState<
    number | 'off' | 'auto' | 'on' | 'torch' | undefined
  >('off')

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

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const __handleFlashMode = () => {}

  const backgroundColor: string = flashMode === 'off' ? '#000' : '#fff'

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              /* type={cameraType} */
              flashMode={flashMode}
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
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: `${backgroundColor}`,
                      borderRadius: '50%',
                      height: 25,
                      width: 25,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                      }}>
                      ⚡️
                    </Text>
                  </TouchableOpacity>
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
              </View>
            </Camera>
          )}
        </View>
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
