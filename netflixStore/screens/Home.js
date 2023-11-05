import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  List,
  ListItem,
  Title,
  Text,
  H1,
  Left,
  Right,
  Button,
  Body,
  InputRightAddon,
  Checkbox,
  Fab,
  Icon,
  Subtitle,
  Container,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, route}) => {
  const [listOfSeasons, setListOfSeasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getList = async () => {
    setLoading(true);

    const storedValue = await AsyncStorage.getItem('@season_list');

    if (!storedValue) {
      setListOfSeasons([]);
    }

    const list = JSON.parse(storedValue);
    setListOfSeasons(list);
    setLoading(false);
  };

  const deleteSeason = async id => {
    const newList = await listOfSeasons.filter(list => list.id !== id);
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
    setListOfSeasons(newList);
  };

  const markCompelete = async id => {
    const newArr = listOfSeasons.map(list => {
      if (list.id === id) {
        list.isWatched = !list.isWatched;
      }
      return list;
    });

    await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
    setListOfSeasons(newArr);
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  if (loading) {
    return (
      <Container style={styles.container}>
        <Spinner color="#00b7c2" />
      </Container>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>List of seasons goes here</Text>
      {listOfSeasons.length === 0 ? (
        <Container style={styles.container}>
          <H1 style={styles.heading}>Watchlist is empty.Please add a season</H1>
        </Container>
      ) : (
        <>
          <H1 style={styles.heading}>Next series to watch</H1>
          <List>
            {listOfSeasons.map(seasons => (
              <ListItem key={seasons.id} style={styles.listItem} noBorder>
                <Left>
                  <Button style={styles.actionButton} danger>
                    <Icon
                      name="trash"
                      active
                      onPress={() => deleteSeason(seasons.id)}
                    />
                  </Button>
                  <Button
                    style={styles.actionButton}
                    onPress={() => {
                      navigation.navigate('Edit', {seasons});
                    }}>
                    <Icon name="trash" type="Feather" active />
                  </Button>
                </Left>

                <Body>
                  <Title style={styles.seasonName}>{seasons.name}</Title>
                  <Text note>{seasons.totalNoSeason} Seasons to watch</Text>
                </Body>

                <Right>
                  <Checkbox
                    checked={seasons.isWatched}
                    onPress={() => markCompelete(seasons.id)}
                  />
                </Right>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Fab
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => navigation.navigate('Add')}>
        <Icon name="add" />
      </Fab>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
