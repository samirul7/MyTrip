import axios from 'axios'
export const API_URL = 'http://localhost:5000/api'

export async function getTripInfo(id) {
  const res = await axios({
    method: 'get',
    url: `${API_URL}/trip/${id}`,
  })

  if (res.status !== 200) throw new Error('Failed getting Trip info.')

  return res.data
}
