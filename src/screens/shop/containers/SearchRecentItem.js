import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {StyleSheet} from 'react-native';
import {ListItem, Text, ThemeConsumer} from 'src/components';
import Container from 'src/containers/Container';

import {filterBySelector, recentSearch} from 'src/modules/product/selectors';

import {margin} from 'src/components/config/spacing';

const SearchRecentItem = props => {
  const {recent, search, handleRecentKeyword} = props;
  const {t} = useTranslation();

  if (search && search.length > 0) {
    return null;
  }

  return (
    <ThemeConsumer>
      {({theme}) => (
        <Container>
          <Text h3 medium style={styles.textTitle}>
            {t('catalog:text_recent_search')}
          </Text>
          {recent.map(searchName => (
            <ListItem
              key={searchName}
              title={searchName}
              titleProps={{
                colorThird: true,
              }}
              small
              type="underline"
              leftIcon={{
                name: 'clock',
                size: 16,
                color: theme.colors.textColorThird,
              }}
              onPress={() => handleRecentKeyword(searchName)}
            />
          ))}
        </Container>
      )}
    </ThemeConsumer>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    marginTop: margin.small,
  },
});

SearchRecentItem.defaultProps = {
  handleRecentKeyword: () => {},
};

const mapStateToProps = state => {
  return {
    recent: recentSearch(state),
    search: filterBySelector(state).get('search'),
  };
};

export default connect(mapStateToProps)(SearchRecentItem);
