import { useParams } from 'react-router-dom'
import { Accordion, Heading, HStack, Text } from 'rsuite'
import Photo from '../Photo/Photo'
import { useQuery } from '@tanstack/react-query'
import privateAxios from '../../app/api/privateAxios'

const Trip = () => {
  const params = useParams()

  const {
    data: tripInfo,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['tripInfo'],
    queryFn: async () =>
      (
        await privateAxios.get('/trip', {
          params: {
            id: params.id,
          },
        })
      ).data,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  return (
    <>
      <HStack justifyContent='space-between' style={{ padding: '0 20px' }}>
        <Heading>{tripInfo.name}</Heading>
        <Text>Location: {tripInfo.location}</Text>
      </HStack>
      <Photo />
      <Accordion>
        <Accordion.Panel header='Videos' defaultExpanded>
          {tripInfo.media?.videos.map((video) => (
            <video
              key={video._id}
              width='550px'
              style={{ padding: '3px' }}
              controls
            >
              <source src={video.url} type='video/mp4' />
            </video>
          ))}
        </Accordion.Panel>
      </Accordion>
    </>
  )
}

export default Trip
