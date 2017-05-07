import React from 'react';
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

export default class WelcomeToVR extends React.Component {
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
				console.log(responseJson.corporateContacts.contacts);
        this.setState({contacts: responseJson.corporateContacts.contacts})
      })
      .catch((error) => {
        console.error(error);
      });
	}

	render() {
		console.log('hey, Im printing out');
		console.log(this.state)
		let defaultText = {
			backgroundColor: this.state.backgroundColor,
			color: '#000000',
			fontSize: 0.4,
			fontWeight: '400',
			layoutOrigin: [0.5, 0.5],
			paddingLeft: 0.2,
			paddingRight: 0.2,
			height: 0.5,

			textAlign: 'center',
			textAlignVertical: 'center'
		};

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
				: <View >
						<View onEnter={() => this.setState({backgroundColor: '#a5c7ff'})} onExit={() => this.setState({backgroundColor: '#ffffff'})}>
							<Text	style={Object.assign({}, defaultText, {transform: [{translate: [0, 3, -6]}]})}>
								Name: {this.state.contacts[0].givenName} {this.state.contacts[0].familyName}
							</Text>
							<Text	style={Object.assign({}, defaultText, {transform: [{translate: [0, 3, -6]}]})}>
								Email: {this.state.contacts[0].email[0].uri}
							</Text>
							<Text	style={Object.assign({}, defaultText, {transform: [{translate: [0, 3, -6]}]})}>
								Phone: {this.state.contacts[0].phone[0].formattedDialNumber}
							</Text>
						</View>
						<View onEnter={() => this.setState({backgroundColor: '#a5c7ff'})} onExit={() => this.setState({backgroundColor: '#ffffff'})}>
							<Text	style={Object.assign({}, defaultText, {transform: [{translate: [0, 2.5, -6]}]})}>
								Name: {this.state.contacts[1].givenName} {this.state.contacts[1].familyName}
							</Text>
							<Text	style={Object.assign({}, defaultText, {transform: [{translate: [0, 2.5, -6]}]})}>
								Email: {this.state.contacts[1].email[0].uri}
							</Text>
							<Text	style={Object.assign({}, defaultText, {transform: [{translate: [0, 2.5, -6]}]})}>
								Phone: {this.state.contacts[1].phone[0].formattedDialNumber}
							</Text>
						</View>
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

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
