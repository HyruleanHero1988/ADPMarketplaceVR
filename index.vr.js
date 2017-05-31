import React, { Component } from 'react';
import {
	AppRegistry,
	asset,
	StyleSheet,
	Pano,
	Text,
	View,
	Image,
	VrButton,
	Animated
} from 'react-vr';

const Easing = require('Easing');

import CylindricalPanel from 'CylindricalPanel';

class Playground extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bounceValue: new Animated.Value(0),
		};
	}
	render() {
		return (
			<Animated.Image                         // Base: Image, Text, View
				source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
				style={{
					flex: 1,
					width: 1,
					height: 1,
					transform: [                        // `transform` is an ordered array
						{scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
					]
				}}
			/>
		);
	}
	componentDidMount() {
		this.state.bounceValue.setValue(1.5);     // Start large
		Animated.spring(                          // Base: spring, decay, timing
			this.state.bounceValue,                 // Animate `bounceValue`
			{
				toValue: 0.8,                         // Animate to smaller size
				friction: 1,                          // Bouncier spring
			}
		).start();                                // Start the animation
	}
}

class Card extends Component {

	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: '#a5c7ff'
		};
	}

	render() {
		const contact = this.props.contact;

		const defaultText = {
			color: '#000000',
			fontSize: 20,
			fontWeight: '200',
			height: 50,
			textAlign: 'left',
			textAlignVertical: 'center'
		};
		return (
			<View style={{

					backgroundColor: this.state.backgroundColor,
					paddingLeft: 20,
					marginBottom: 20,
					width: 400
				}}
				onEnter={() => this.setState({backgroundColor: 'blue'})}
				onExit={() => this.setState({backgroundColor: '#a5c7ff'})}
			>
				<View style={{
						padding: 20,
						backgroundColor: 'white'
					}}
				>
					<Text	style={[defaultText, {fontSize: 30, fontWeight: '400'}]}>
						Name: {contact.givenName} {contact.familyName}
					</Text>
					<Text	style={defaultText}>
						Email: {contact.email[0].uri}
					</Text>
					<Text	style={defaultText}>
						Phone: {contact.phone[0].formattedDialNumber}
					</Text>
				</View>
			</View>
		);
	}
}

class ADPMarketplace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: '#ffffff',
			welcome: true,
			contactSlideValue: new Animated.Value(2201),
			page: 0
		};
	}

	componentDidMount(){
		fetch('https://test-api.adp.com/hr/v1/corporate-contacts/')
			.then((response) => response.json())
			.then((responseJson) => {
				const originalContacts = responseJson.corporateContacts.contacts;
				const splitContacts = [];
				const contacts = [];
				while(originalContacts.length){
					splitContacts.push(originalContacts.splice(0,4));
				}
				console.log(splitContacts);
				while(splitContacts.length){
					contacts.push(splitContacts.splice(0,5));
				}
				console.log(contacts);
				this.setState({contacts: contacts})
			})
			.catch((error) => {
				console.error(error);
			});

	}

	render() {
		console.log('hey, Im printing out');
		console.log(this.state);
		//console.log(this.state.contacts && this.state.contacts.length);
		const welcomeText = {
			backgroundColor: this.state.backgroundColor,
			color: '#000000',
			fontSize: 70,
			fontWeight: '400',
			paddingLeft: 100,
			paddingRight: 100,
			width: 600,
			textAlign: 'center',
			textAlignVertical: 'center'
		};

		return (
			<View>
				<Pano source={asset('wall.jpg')}/>

				<CylindricalPanel layer={{width: 2200, height: 1000, density: 4680, radius: 5}} style={{position: 'absolute'}}>
					<View
						style={{
							//opacity: 1,
							//backgroundColor: 'red',
							width: 2200,
							height: 1000,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{this.state.welcome === true &&
						<VrButton onEnter={() => this.setState({backgroundColor: '#0000ff'})} onExit={() => this.setState({backgroundColor: '#ffffff'})}
							onClick={() => {
								console.log('welcome component got clicked');
								this.setState({welcome: false, backgroundColor: '#ffffff'});
								//this.state.contactSlideValue.setValue(100);
								console.log(this.state.contactSlideValue.Value);
								Animated.timing(
									this.state.contactSlideValue,
									{
										toValue: 0,
										duration: 1000,
										easing: Easing.ease
									}
								).start();

							}

							}>
								<Text
									style={welcomeText}>
									Welcome to
								</Text>
								<Image source={require('./static_assets/adp-marketplace-logo-banner.png')}
									style={{width: 600, height: 170, backgroundColor: this.state.backgroundColor, transform: [{translate: [0, 0, -500]}]}} />
								<Text
									style={welcomeText}
								>
									HR in VR
								</Text>
							</VrButton>
						}
						{this.state.welcome === false &&
							<Animated.View style={{flexDirection: 'row', transform:[{translateX: this.state.contactSlideValue}]}}>
								 {this.state.contacts[this.state.page].map((contactArray, i) => {
									 return (
										 <View style={{margin:20}}>
											 {contactArray.map((contact) => {
												 return (
													 <Card contact={contact}/>
												 );
											 })}
										 </View>
									 )
								 })}
							 </Animated.View>
						}
					</View>
				</CylindricalPanel>
			</View>
		);
	}
};

AppRegistry.registerComponent('ADPMarketplace', () => ADPMarketplace);
