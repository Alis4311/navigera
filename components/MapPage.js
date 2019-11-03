import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import ProductListItem from "./ProductListItem.js"
import ProductListFooter from "./ProductListFooter.js"
import { globalStyles } from '../utilities.js';
import { Icon } from "@up-shared/components";

export default class MapPage extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const products = this.props.screenProps.products;
	let sortedList = JSON.parse(JSON.stringify(products)); //deep copy. 
	sortedList.sort(compare);
	console.log("sortedList: " + sortedList);
    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, globalStyles.bold]}> Sorted </Text>
        <TouchableHighlight style={styles.button}>
            <Icon name="three-dots" size={30} color="white"></Icon>
        </TouchableHighlight>
      </View>
        <ScrollView style={[styles.container, styles.padding]}>
          {sortedList.map(p => {
            return <ProductListItem product={p} removeCallback={this.props.screenProps.removeItemCallback} key={p.product_info.id}/>
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function compare(product1, product2){
    let product1volume = product1.measurements.package.height * product1.measurements.package.width * product1.measurements.package.length;
    let product2volume = product2.measurements.package.height * product2.measurements.package.width * product2.measurements.package.length;
	
    if(product1volume < product2volume){
        return 1;
    } 
    if(product1volume > product2volume){
        return -1; 
    }

    return 0; 
}

const styles = StyleSheet.create({
	button: {
    color:"white"
  },

  container:{
    flex: 1,
    backgroundColor:"#f4f4f4"
  },

  padding:{
    padding: 20,
  },

  image:{
    width: 300,
    height: 300
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0058a3',
    height: 70,
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 15,
  },
  button: {
      backgroundColor: '#0058a3',
      height: 25,
      width: 50,
      paddingBottom: 20,
      paddingTop: 10,
      paddingRight: 80,
      margin: 25,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonInterior: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 45,


  },
});
