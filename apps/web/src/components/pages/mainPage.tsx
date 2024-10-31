import * as React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

/** MUI */
import { Grid, Paper, Snackbar, Box } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'

/** Components */
import { useAudioRecorder } from 'react-audio-voice-recorder'

function convertDataURIToBinary(dataURI: any) {
  var BASE64_MARKER = ';base64,'
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  var base64 = dataURI.substring(base64Index)
  var raw = window.atob(base64)
  var rawLength = raw.length
  var array = new Uint8Array(new ArrayBuffer(rawLength))

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i)
  }
  return array
}

const addAudioElement = (data: any) => {
  // Convert base64 str from API into blob
  const binary = convertDataURIToBinary(data)
  const blob = new Blob([binary], { type: 'audio/mpeg' })
  const blobUrl = URL.createObjectURL(blob)

  // Update audio source with blob url
  const audioElem = document.getElementById('audio')
  const audioSourceElem = document.getElementById('audioSource')

  // Play it automatically
  audioSourceElem.src = blobUrl
  audioElem.pause()
  audioElem.load()
  audioElem.oncanplaythrough = () => {
    audioElem.play()
  }
}

/** Implementation */
export const MainPage: React.FC = () => {
  /** Hooks */
  const { startRecording, stopRecording, recordingBlob, isRecording } =
    useAudioRecorder()

  /** Effects */
  useEffect(() => {
    if (!recordingBlob) return

    const filename = 'audio.mp3'
    const file = new File([recordingBlob], filename, {
      type: recordingBlob.type,
    })

    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)

    const audioDataInput = document.getElementById('audioData')
    audioDataInput.files = dataTransfer.files

    const formData = new FormData()
    formData.append('file', audioDataInput.files[0])
    formData.append('filename', filename)

    axios
      .post('http://localhost:8020/audio/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        addAudioElement(response.data)
      })
  }, [recordingBlob])

  useEffect(() => {
    document.getElementById('audio').pause()
  }, [isRecording])

  /** Actions */
  const pauseAudio = () => {
    document.getElementById('audio').pause()
  }

  return (
    <Box sx={{ pb: 7 }} overflow="auto">
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isRecording}
        message={'Recording...'}
        sx={{ '&.MuiSnackbar-root': { bottom: '70px' } }}
      />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '82vh' }}
      >
        <Box overflow="auto">
          {isRecording ? (
            <span>Recording now...</span>
          ) : (
            <span>Click below to send a message</span>
          )}
        </Box>

        <audio id="audio" controls style={{ opacity: 0 }}>
          <source id="audioSource" src="" type="audio/mpeg" />
        </audio>

        <form name="audioDataForm" style={{ opacity: 0 }}>
          <input
            accept="audio/mpeg"
            id="audioData"
            name="audioData"
            type="file"
          />
        </form>
      </Grid>

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          {isRecording ? (
            <BottomNavigationAction
              label="Stop Recording"
              onClick={stopRecording}
              icon={<VoiceOverOffIcon />}
            />
          ) : (
            <BottomNavigationAction
              label="Start Recording"
              onClick={startRecording}
              icon={<RecordVoiceOverIcon />}
            />
          )}

          <BottomNavigationAction
            label="Pause Audio"
            onClick={pauseAudio}
            icon={<PauseCircleIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
