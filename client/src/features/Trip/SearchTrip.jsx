import styles from './SearchTrip.module.css'

import { Container, Content, Input, InputGroup, Stack } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search'
import { useState } from 'react'
import privateAxios from '../../app/api/privateAxios'
import { useQuery } from '@tanstack/react-query'
import TripList from './TripList'

const SearchTrip = () => {
  const [searchValue, setSearchValue] = useState('')
  const [filteredTrips, setFileredTrips] = useState([])

  const getTrips = async () => (await privateAxios.get('/trip')).data

  const {
    data: trips,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['trips'],
    queryFn: getTrips,
    retry: false,
  })

  const handleChange = (value) => {
    setFileredTrips(
      trips.filter(
        (trip) =>
          trip._id.includes(value.toLowerCase()) ||
          trip.name.toLowerCase().includes(value.toLowerCase())
      )
    )
    setSearchValue(value)
  }

  return (
    <Container>
      <Content>
        <Stack
          alignItems='center'
          justifyContent='center'
          style={{ height: '100%', marginTop: '50px' }}
        >
          <InputGroup
            inside
            style={{
              width: 300,
            }}
          >
            <Input
              placeholder='Search trip by name or id'
              value={searchValue}
              onChange={handleChange}
            />
            <InputGroup.Button>
              <SearchIcon onClick={() => console.log('clicked')} />
            </InputGroup.Button>
          </InputGroup>
        </Stack>
        {isLoading && <p className={styles.loading}>Loading...</p>}
        {isError && <p className={styles.error}>Something went wrong.</p>}
        {isSuccess && (
          <TripList
            trips={
              filteredTrips.length === 0 && searchValue === ''
                ? trips
                : filteredTrips
            }
          />
        )}
      </Content>
    </Container>
  )
}
export default SearchTrip
