import { useEffect, useState } from 'react'

const App = () => {
  const [client, setClient] = useState(null)
  const [accessToken, setAccessToken] = useState(
    'ya29.a0AfB_byAuZfhcZmOQHSFUrtE0RV4u3P-FLfim5299WeJxKGk6oX2Hr3tS7GUeKxyM_LS9Cjp6A6-EIkz80bLVAc-sfkIQrOEpCFu41sH5KM0i_N91Vo8iZtVRqieElt5vFrdalcVzCHrshEhWmMIwgHzbaDz1z6BKZgaCgYKAU4SARASFQHGX2MiQT9ywPOR4XfiZd7gd72Ujg0169'
  )

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.onload = initClient
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }

    loadScript()
  }, [])

  const initClient = () => {
    const CLIENT_ID =
      '84532789310-84lthahs8re0l6mpj7tgs6k76dmk0sol.apps.googleusercontent.com' // NEXT_PUBLIC_ が必要な環境変数です
    const SCOPE = 'https://www.googleapis.com/auth/calendar'

    const initTokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: tokenResponse => {
        console.log(tokenResponse)
        setAccessToken(tokenResponse.access_token)
      }
    })
    setClient(initTokenClient)
  }

  const getToken = () => {
    client.requestAccessToken()
  }

  return (
    <div>
      <h1>カレンダーアプリ</h1>
      <button onClick={getToken}>アクセストークン取得</button>
      <br />
      <br />
      {accessToken && (
        <div>
          <h2>アクセストークン</h2>
          <p>{accessToken}</p>
        </div>
      )}
    </div>
  )
}

export default App
