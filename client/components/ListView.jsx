import React from 'react'
import { View, FlatList, ScrollView, Dimensions } from 'react-native'

import ShowCard from './ShowCard'

function ListView({ data }) {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          height: Dimensions.get('window').height * 1.55,
          width: Dimensions.get('window').width,
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        {/* <FlatList
            data={data.movies}
            renderItem={({ item }) => <ShowCard key={item.id} item={item} />}
          /> */}
        {data.map(item => (
          <ShowCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  )
}

export default ListView
