import React, { ReactNode } from 'react';
import CodepushProvider from './src/CodepushProvider';
import NavigationBuilder from './src/router/NavigationBuilder';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens(true);


const App: () => ReactNode = () => {
  return (
    <CodepushProvider>
      <NavigationBuilder /> 
    </CodepushProvider>
  );
};

export default App;