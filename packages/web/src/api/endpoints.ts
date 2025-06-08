// A lot easier to manage in one place and mock in tests having urls pulled from functions
const getApiUrl = () => {
  return `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`
}

export { getApiUrl }
