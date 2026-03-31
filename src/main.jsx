import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { BookmarksProvider } from './context/BookmarksContext'
import { WatchHistoryProvider } from './context/WatchHistoryContext'
import { RatingsProvider } from './context/RatingsContext'
import { CommentsProvider } from './context/CommentsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <BookmarksProvider>
            <RatingsProvider>
              <WatchHistoryProvider>
                <CommentsProvider>
                  <App />
                </CommentsProvider>
              </WatchHistoryProvider>
            </RatingsProvider>
          </BookmarksProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
