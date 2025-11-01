import {useUser} from '@clerk/clerk-expo';
import {Stack} from 'expo-router/stack';
import {Redirect} from 'expo-router';

export default function Layout() {
  const {isSignedIn,isLoaded} = useUser();
  if(!isLoaded){   //this is important to avoid flicker/load
    return null;
  }
  if(!isSignedIn) {
    return <Redirect href={"sign-in"} />
  }
  return <Stack screenOptions={{headerShown: false}} />;
}