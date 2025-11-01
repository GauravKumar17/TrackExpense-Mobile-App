import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl,Alert} from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect,useState } from 'react'
import PageLoader from '@/components/PageLoader'
import { styles } from '@/assets/styles/home.styles.js'
import { Ionicons } from '@expo/vector-icons'
import { BalanceCard } from '../../components/BalanceCard'
import { TransactionItem } from '../../components/TransactionItems'
import NoTransactionsfound from '../../components/NoTransactionsfound'

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {transactions,summary,isloading,loadData,deleteTransaction} = useTransactions(user.id);

  useEffect(()=>{
    loadData();
  },[loadData]);

  const onRefresh = async() => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }
  const handleDelete = (id) => {
    Alert.alert("Delete Transactions","Are you sure you want to delete this transaction?",[
      {
        text:"Cancel", style:"cancel" 
      },
      {
        text:"Delete", style:"destructive", onPress: ()=> deleteTransaction(id)
      }

    ]);
    onRefresh();

  }

  if(isloading && !refreshing){
    return <PageLoader/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>

            {/* <Image 
              source={require("../../assets/images/video.png")} 
              style ={styles.headerLogo} 
              resizeMode='contain'/> */}

             <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              
              </Text>
            </View>
          
          

          
        </View>
        <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={()=>router.push("/create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton/>
              
          </View>

      </View>

      <BalanceCard summary={summary}/>
      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>
      
      
    </View>
       <FlatList
         style={styles.transactionList}
         contentContainerStyle={styles.transactionListContent}
         data={transactions}
         renderItem={({ item }) => (
            <TransactionItem item={item} onDelete={handleDelete} />
          )}
          ListEmptyComponent={<NoTransactionsfound/>}
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isloading} onRefresh={loadData} />}

        />
        
  
    </View>
  )
}