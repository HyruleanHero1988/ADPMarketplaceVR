import React, { Component } from 'react';
import {
	AppRegistry,
	asset,
	StyleSheet,
	Pano,
	Text,
	View,
	Image,
	VrButton
} from 'react-vr';

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
			fontSize: 0.4,
			fontWeight: '400',
			height: 0.5,
			textAlign: 'left',
			textAlignVertical: 'center'
		};
		return (
			<View style={{

					backgroundColor: this.state.backgroundColor,
					layoutOrigin: [0.5, 0.5],
					paddingLeft: 0.5,
					marginBottom: .1,
					width: 8
				}}
				onEnter={() => this.setState({backgroundColor: 'blue'})}
				onExit={() => this.setState({backgroundColor: '#a5c7ff'})}
			>
				<View style={{
						padding: 0.3,
						backgroundColor: 'white'
					}}
				>
					<Text	style={defaultText}>
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
			welcome: true
		};
	}

	componentDidMount(){
		fetch('https://test-api.adp.com/hr/v1/corporate-contacts/')
      .then((response) => response.json())
      .then((responseJson) => {
				const originalContacts = responseJson.corporateContacts.contacts;
				const contacts = [];
				while(originalContacts.length){
					contacts.push(originalContacts.splice(0,4));
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
		console.log(this.state.contacts && this.state.contacts.length);

		return (
			<View>
				<Pano source={asset('wall.jpg')}/>
				{this.state.welcome === true
				? <VrButton onEnter={() => this.setState({backgroundColor: '#0000ff'})} onExit={() => this.setState({backgroundColor: '#ffffff'})}
					onClick={() => {
						console.log('welcome component got clicked')
						this.setState({welcome: false, backgroundColor: '#ffffff'})}
					}>
						<Text
							style={{
								backgroundColor: this.state.backgroundColor,
								color: '#000000',
								fontSize: 0.8,
								fontWeight: '400',
								layoutOrigin: [0.5, 0.5],
								paddingLeft: 0.2,
								paddingRight: 0.2,
								width: 7,
								textAlign: 'center',
								textAlignVertical: 'center',
								transform: [{translate: [0, 1, -6]}]
							}}>
							Welcome to
						</Text>
						<Image source={require('./static_assets/adp-marketplace-logo-banner.png')}
							style={{width: 7, height: 2, layoutOrigin: [0.5, 0.5],transform: [{translate: [0, 1, -6]}],backgroundColor: this.state.backgroundColor,}} />
						<Text
							style={{
								backgroundColor: this.state.backgroundColor,
								color: '#000000',
								fontSize: 0.8,
								fontWeight: '400',
								layoutOrigin: [0.5, 0.5],
								paddingLeft: 0.2,
								paddingRight: 0.2,
								width: 7,
								textAlign: 'center',
								textAlignVertical: 'center',
								transform: [{translate: [0, 2, -6]}],
							}}
						>
							HR in VR
						</Text>
					</VrButton>
				: <View style={{transform: [{translate: [-20, 3, -10]}], flexDirection: 'row'}}>
						{this.state.contacts.map((contactArray, i) => {
							const rotationArray = [60,30,0,-30,-60,-90];
							const positionalZArray = [6,1,0,5,11,20];
							return (
								<View style={{margin:.5, transform: [{translateZ: positionalZArray[i] }, {rotateY: rotationArray[i]} ] }}>
									{contactArray.map((contact) => {
										return (
											<Card contact={contact}/>
										);
									})}
								</View>
							)


						})}
					</View>
				}
				<Text
					style={{
						backgroundColor: '#777879',
						color: '#000077',
						fontSize: 0.8,
						fontWeight: '400',
						layoutOrigin: [0.5, 0.5],
						paddingLeft: 0.2,
						paddingRight: 0.2,
						textAlign: 'center',
						textAlignVertical: 'center',
						transform: [{translate: [0, 2.5, 6]},{scale: [-1,1,1]}],
					}}>
					Dont look back here!
				</Text>
				<Text
					style={{
						backgroundColor: '#777879',
						color: '#000077',
						fontSize: 0.8,
						fontWeight: '400',
						layoutOrigin: [0.5, 0.5],
						paddingLeft: 0.2,
						paddingRight: 0.2,
						textAlign: 'center',
						textAlignVertical: 'center',
						transform: [{translate: [0, 2.5, 6]},{scale: [-1,1,1]}],
					}}>
					The devs are busy!
				</Text>
			</View>
		);
	}
};

AppRegistry.registerComponent('ADPMarketplace', () => ADPMarketplace);
