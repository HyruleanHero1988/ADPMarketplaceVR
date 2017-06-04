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

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: '#a5c7ff'
		};
	}

	render() {
		const contact = this.props.contact;
		const {showInnerCylinderCb} = this.props;

		const defaultText = {
			color: '#000000',
			fontSize: 20,
			fontWeight: '200',
			height: 50,
			textAlign: 'left',
			textAlignVertical: 'center'
		};
		return (
			<VrButton style={{
					backgroundColor: this.state.backgroundColor,
					paddingLeft: 20,
					marginBottom: 20,
					width: 400
				}}
				onClick={() => showInnerCylinderCb(true, this.props.contact)}
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
			</VrButton>
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
			page: 0,
			showInnerCylinder: false,
			currentContact: {},
			closeButtonColor: 'red',
			welcomeOpacity: new Animated.Value(1),
			prevButtonColor: 'white',
			nextButtonColor: 'white',
		};
		this.showInnerCylinder = this.showInnerCylinder.bind(this);
	}

	componentDidMount(){
		// fetch('https://test-api.adp.com/hr/v1/corporate-contacts/')
		// 	.then((response) => response.json())
		// 	.then((responseJson) => {
		// 		const originalContacts = responseJson.corporateContacts.contacts;
		// 		const splitContacts = [];
		// 		const contacts = [];
		// 		while(originalContacts.length){
		// 			splitContacts.push(originalContacts.splice(0,4));
		// 		}
		// 		while(splitContacts.length){
		// 			contacts.push(splitContacts.splice(0,5));
		// 		}
		// 		this.setState({contacts: contacts})
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
		const originalContacts = [
      {
        "givenName": "David",
        "familyName": "Abbott",
        "phone": [
          {
            "labelName": "work",
            "channelCode": "phone",
            "formattedDialNumber": "8002255237",
            "extension": "1234"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "david_abbott@adpdemo"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011001"
        }
      },
      {
        "givenName": "Gregory",
        "middleName": "Joe",
        "familyName": "Addington",
        "phone": [
          {
            "labelName": "work",
            "channelCode": "phone",
            "formattedDialNumber": "8002255237",
            "extension": "1235"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "gregory_addington@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011002"
        }
      },
      {
        "givenName": "Tara",
        "familyName": "Adkins",
        "phone": [
          {
            "labelName": "work",
            "channelCode": "phone",
            "formattedDialNumber": "8002255237",
            "extension": "1236"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "tara_adkins@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011003"
        }
      },
      {
        "givenName": "Anthony",
        "familyName": "Albright",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "9735553245"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "anthony_albright@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011201"
        }
      },
      {
        "givenName": "Pamela",
        "familyName": "Alvarez",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "pamela_alvarez@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011199"
        }
      },
      {
        "givenName": "Chester",
        "middleName": "C",
        "familyName": "Becker",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "chester_becker@adpdemo"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011014"
        }
      },
      {
        "givenName": "Darrell",
        "middleName": "Rob",
        "familyName": "Dylan",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "darrell_dylan@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011050"
        }
      },
      {
        "givenName": "George",
        "middleName": "Franklin",
        "familyName": "English",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "george_english@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011051"
        }
      },
      {
        "givenName": "Jennifer",
        "middleName": "Annette",
        "familyName": "Harrington",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "jennifer_harrington@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011076"
        }
      },
      {
        "givenName": "Rob",
        "familyName": "Hatton",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "rob_hatton@adpdemo"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011077"
        }
      },
      {
        "givenName": "Amanda",
        "familyName": "Hess",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "amanda_hess@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011078"
        }
      },
      {
        "givenName": "Kenneth",
        "familyName": "Jaques",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "kenneth_jaques@adpdemo"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011088"
        }
      },
      {
        "givenName": "Russell",
        "middleName": "R",
        "familyName": "Keran",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "russell_keran@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011094"
        }
      },
      {
        "givenName": "Gary",
        "middleName": "Andrew",
        "familyName": "King",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "gary_king@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011095"
        }
      },
      {
        "givenName": "Janet",
        "middleName": "Hillary",
        "familyName": "Kingsley",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "janet_kingsley@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011096"
        }
      },
      {
        "givenName": "Charles",
        "familyName": "Roy",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "charles_roy@adpdemo"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011165"
        }
      },
      {
        "givenName": "George",
        "middleName": "Antonio",
        "familyName": "Garcia",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "george_garcia@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011164"
        }
      },
      {
        "givenName": "Helen",
        "middleName": "Morgan",
        "familyName": "Story",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "helen_story@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011166"
        }
      },
      {
        "givenName": "Roxanne",
        "familyName": "Stryker",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "roxanne_stryker@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011167"
        }
      },
      {
        "givenName": "Sarah",
        "middleName": "L",
        "familyName": "Woo",
        "phone": [
          {
            "labelName": "work",
            "formattedDialNumber": "8002255237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "sarah_woo@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011198"
        }
      },
      {
        "givenName": "Carl",
        "middleName": "Earnest",
        "familyName": "Yager",
        "phone": [
          {
            "labelName": "work",
            "channelCode": "phone",
            "formattedDialNumber": "8002255237",
            "extension": "1237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "carl_yager@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011200"
        }
      }
    ];
		for(i = 1; i < 101; i++){
			const newContact = {
        "givenName": "Dummy",
        "middleName": "User",
        "familyName": i,
        "phone": [
          {
            "labelName": "work",
            "channelCode": "phone",
            "formattedDialNumber": "8002255237",
            "extension": "1237"
          }
        ],
        "email": [
          {
            "labelName": "work",
            "uri": "dummy_user@adpdemo.com"
          }
        ],
        "associateUri": {
          "href": "/hr/v1/corporate-contacts/A1316C0D49011200"
        }
      };
			originalContacts.push(newContact);
		}
		const splitContacts = [];
				const contacts = [];
				while(originalContacts.length){
					splitContacts.push(originalContacts.splice(0,4));
				}
				while(splitContacts.length){
					contacts.push(splitContacts.splice(0,5));
				}
				this.setState({contacts: contacts})
	}

	showInnerCylinder(val, contact){
		if(val === true){
			this.setState({showInnerCylinder: val, currentContact: contact, closeButtonColor:'red'});
			Animated.timing(
				this.state.welcomeOpacity,
				{
					toValue: 1,
					duration: 300,
					easing: Easing.ease
				}
			).start();
		} else {
			Animated.timing(
				this.state.welcomeOpacity,
				{
					toValue: 0,
					duration: 300,
					easing: Easing.ease
				}
			).start();
		}
		setTimeout(function(){this.setState({showInnerCylinder: val, currentContact: contact, closeButtonColor:'red'})}.bind(this),300);
	}

	render() {
		const welcomeText = {
			backgroundColor: this.state.backgroundColor,
			color: '#000000',
			fontSize: 70,
			fontWeight: '400',
			paddingLeft: 100,
			paddingRight: 100,
			width: 600,
			textAlign: 'center',
			textAlignVertical: 'center',
		};

		const detailsText = {
			color: '#000000',
			fontSize: 40,
			fontWeight: '200',
			marginLeft: 50,
			marginRight: 50,
			textAlign: 'center',
		};

		return (
			<View>
				<Pano source={asset('wall.jpg')}/>
				<View>
				<CylindricalPanel layer={{width: 2200, height: 1000, density: 4680, radius: 6}} style={{position: 'absolute'}}>
					<View
						style={{
							width: 2200,
							height: 1000,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{this.state.welcome === true &&
						<VrButton onEnter={() => this.setState({backgroundColor: '#a5c7ff'})} onExit={() => this.setState({backgroundColor: '#ffffff'})}
							onClick={() => {
								setTimeout(function(){this.setState({welcome: false, backgroundColor: '#ffffff'})}.bind(this),300);
								Animated.timing(
									this.state.welcomeOpacity,
									{
										toValue: 0,
										duration: 300,
										easing: Easing.ease
									}
								).start();
								Animated.timing(
									this.state.contactSlideValue,
									{
										toValue: 0,
										duration: 1000,
										easing: Easing.ease
									}
								).start();}
							}>
								<Animated.Text
									style={[welcomeText, {opacity: this.state.welcomeOpacity}]}>
									Welcome to
								</Animated.Text>
								<Animated.Image source={require('./static_assets/adp-marketplace-logo-banner.png')}
									style={{width: 600, height: 170, backgroundColor: this.state.backgroundColor, opacity: this.state.welcomeOpacity, transform: [{translate: [0, 0, -500]}]}} />
								<Animated.Text
									style={[welcomeText, {opacity: this.state.welcomeOpacity}]}
								>
									HR in VR
								</Animated.Text>
								<Animated.Text
									style={[welcomeText, {opacity: this.state.welcomeOpacity, fontSize: 30}]}
								>
									Click this panel to begin
								</Animated.Text>
							</VrButton>
						}
						{this.state.welcome === false &&
							<Animated.View style={{flexDirection: 'row', transform:[{translateX: this.state.contactSlideValue}]}}>
								{this.state.contacts[this.state.page].map((contactArray, i) => {
									return (
										<View style={{margin:20}}>
											{contactArray.map((contact) => {
												return (
													<Card showInnerCylinderCb={this.showInnerCylinder} contact={contact}/>
												);
											})}
										</View>
									)
								})}
							</Animated.View>
						}
					</View>
				</CylindricalPanel>
				<View style={{ flexDirection: 'row', opacity: this.state.welcome === false ? 1 : 0, display: 'flex', transform: [{translate: [-2, -4, -5]},{rotateX: -40}], width: 2}}>
					<VrButton style={{ backgroundColor: this.state.prevButtonColor, borderRadius: 5, marginRight: 1 }}
						onEnter={() => this.setState({prevButtonColor: '#a5c7ff'})} onExit={() => this.setState({prevButtonColor: '#ffffff'})}
						onClick={() => {
							if(this.state.page > 0){
								const newPage = this.state.page - 1;
								setTimeout(function(){this.setState({page: newPage })}.bind(this),300);
								Animated.sequence([
									Animated.timing(
										this.state.contactSlideValue,
										{
											toValue: 2201,
											duration: 300,
											easing: Easing.ease
										}
									),Animated.timing(
										this.state.contactSlideValue,
										{
											toValue: -2201,
											duration: 1,
											easing: Easing.ease
										}
									),Animated.timing(
										this.state.contactSlideValue,
										{
											toValue: 0,
											duration: 300,
											easing: Easing.ease
										}
									),
								]).start();
							}
						}}
					>
						<Text style={{color: 'black',fontSize: 0.8, height: 1, width: 1, textAlign: 'center', textAlignVertical: 'center',}}>
							{'<'}
						</Text>
					</VrButton>
					<VrButton style={{ backgroundColor: this.state.nextButtonColor, borderRadius: 5, marginLeft: 1 }}
						onEnter={() => this.setState({nextButtonColor: '#a5c7ff'})} onExit={() => this.setState({nextButtonColor: '#ffffff'})}
						onClick={() => {
							if(this.state.page < this.state.contacts.length){
								const newPage = this.state.page + 1;
								setTimeout(function(){this.setState({page: newPage })}.bind(this),300);
								Animated.sequence([
									Animated.timing(
										this.state.contactSlideValue,
										{
											toValue: -2201,
											duration: 300,
											easing: Easing.ease
										}
									),Animated.timing(
										this.state.contactSlideValue,
										{
											toValue: 2201,
											duration: 1,
											easing: Easing.ease
										}
									),Animated.timing(
										this.state.contactSlideValue,
										{
											toValue: 0,
											duration: 300,
											easing: Easing.ease
										}
									),
								]).start();
							}
						}}
					>
						<Text style={{color: 'black',fontSize: 0.8, height: 1, width: 1, textAlign: 'center', textAlignVertical: 'center',}}>
							>
						</Text>
					</VrButton>
				</View>
			</View>
				{this.state.showInnerCylinder === true &&
					<CylindricalPanel layer={{width: 2200, height: 1000, density: 4680, radius: 4}} style={{position: 'absolute'}}>
						<View
							style={{
								width: 2200,
								height: 1000,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Animated.View
								style={{
									backgroundColor: 'white',
									width: 1000,
									height: 700,
									alignItems: 'center',
									justifyContent: 'center',
									opacity: this.state.welcomeOpacity
								}}
								>
								<VrButton style={{
									backgroundColor: this.state.closeButtonColor,
									width: 100,
									height: 100,
									position: 'absolute',
									top: 10,
									right: 10,
									alignItems: 'center',
									justifyContent: 'center',
								}} onClick={()=> this.showInnerCylinder(false)}
									onEnter={() => this.setState({closeButtonColor: '#ff8cb6'})} onExit={() => this.setState({closeButtonColor: 'red'})}>
									<Text style={{
										color: 'white',
										fontSize: 50,
										fontWeight: '400',
										textAlign: 'center',
										textAlignVertical: 'center'
									}}>
										X
									</Text>
								</VrButton>
								<Image source={require('./static_assets/person.png')}
									style={{width: 100, height: 100}} />
								<Text	style={[detailsText, {fontSize: 70, fontWeight: '400'}]}>
									{`${this.state.currentContact.givenName} ${this.state.currentContact.middleName ? this.state.currentContact.middleName + ' ' : ''}${this.state.currentContact.familyName}`}
								</Text>
								<Text	style={detailsText}>
									Job Title: Chief Operating Officer
								</Text>
								<Text	style={detailsText}>
									Department: Corporate
								</Text>
								<Text	style={detailsText}>
									Reports to: David Abbott
								</Text>
								<Text	style={detailsText}>
									Work Location: 5800 Winward Parkway, Alpharetta GA, 30005, USA
								</Text>
								<Text	style={detailsText}>
									Email: {this.state.currentContact.email[0].uri}
								</Text>
								<Text	style={detailsText}>
									Work Phone: {this.state.currentContact.phone[0].formattedDialNumber}
								</Text>
								<Text
									style={detailsText}
								>
									Fax: {this.state.currentContact.phone[0].formattedDialNumber}
								</Text>
							</Animated.View>
						</View>
					</CylindricalPanel>
				}
			</View>
		);
	}
};

AppRegistry.registerComponent('ADPMarketplace', () => ADPMarketplace);
