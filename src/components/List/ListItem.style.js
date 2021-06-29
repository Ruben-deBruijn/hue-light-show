import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const useListItemStyles = StyleSheet.create({
    item: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: 16,
      width: '100%',
    },

    label: {
      fontSize: theme.text.h3,
      color: theme.palette.text.light,
      paddingLeft: 16,
    },
  });