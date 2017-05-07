import React from 'react';
import {
	AppRegistry,
	asset,
	StyleSheet,
	Pano,
	Text,
	View,
	Image
} from 'react-vr';

export default class WelcomeToVR extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: '#ffffff'
		};
	}
	render() {
		console.log('hey, Im printing out');

		return (
			<View>
				<Pano source={asset('wall.jpg')}/>
				<View onEnter={() => this.setState({backgroundColor: '#0000ff'})} onExit={() => this.setState({backgroundColor: '#ffffff'})}>
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
							transform: [{translate: [0, 1, -6]}],
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
					 }}>
					 HR in VR
				 </Text>
			 </View>
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
