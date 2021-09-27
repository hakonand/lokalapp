import React, { useEffect, useState, useContext } from 'react'
import { firebase } from '../firebase'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isMerchant, setIsMerchant] = useState(false)

	const createUser = async (email, password, name) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				userCredentials.user.updateProfile({
					displayName: name,
					email: email,
				})
				setUser(userCredentials.user)
				console.log({ user })

				firebase
					.firestore()
					.collection('users')
					.doc(userCredentials.user.uid)
					.set({
						name: name,
						email: email,
					})
				console.log('aids2')
			})
			.then(() => {
				console.log('Document successfully written!')
			})
			.catch((error) => {
				console.error('Error writing document: ', error)
			})

			.catch((error) => {
				console.log(error)
				alert(error)
			})
	}
	const createMerchant = async (email, password, storeName) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				userCredentials.user.updateProfile({
					displayName: storeName,
					email: email,
				})
				firebase
					.firestore()
					.collection('merchants')
					.doc(userCredentials.user.uid)
					.set({
						storeName: storeName,
						email: email,
						isMerchant: true,
						numberOfProducts: 0,
					})
				setUser(userCredentials.user)

				console.log('aids2')
			})
			.then(() => {
				console.log('Document successfully written!')
			})
			.catch((error) => {
				console.error('Error writing document: ', error)
			})

			.catch((error) => {
				console.log(error)
				alert(error)
			})
	}

	const loginUser = (email, password) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				setUser(userCredentials.user)
				firebase
					.firestore()
					.collection('merchants')
					.doc(userCredentials.user.uid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							setIsMerchant(true)
						} else {
							setIsMerchant(false)
						}
					})
					.catch((error) => {
						console.log('Error getting document:', error)
					})
			})

			.catch((error) => {
				console.log(error)
			})
		console.log(isMerchant)
	}

	const logoutUser = () => {
		console.log('user info')
		console.log(user)

		firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(null)
				setIsMerchant(false)
			})

		console.log('ingen info')
		console.log(user)
	}

	const uploadMerchantInfo = (
		displayName,
		displayEmail,
		displayAddress,
		parentDisplayCountry,
		cityInputValue,
		user
	) => {
		firebase
			.firestore()
			.collection('merchants')
			.doc(user.uid)
			.set({
				storeName: displayName,
				email: displayEmail,
				address: displayAddress,
				city: cityInputValue.cityName,
				country: parentDisplayCountry,
				isMerchant: true,
				numberOfProducts: 0,
			})
			.then(() => {
				console.log('Document successfully written!')
			})
			.catch((error) => {
				console.error('Error writing document: ', error)
			})
	}

	const createProduct = (
		productName,
		productPrice,
		productDescription,
		user,
		selectedTypeValue,
		selectedSubValue,
		selectedMcValue
	) => {
		firebase
			.firestore()
			.collection('norway')
			.doc('bodø')
			.collection(selectedMcValue)
			.doc(selectedSubValue)
			.collection(selectedTypeValue)
			.doc('productid2')
			.set({
				productName: productName,
				productPrice: productPrice,
				productDescription: productDescription,
			})
			.then(() => {
				console.log('Document successfully to collection!')
			})
			.catch((error) => {
				console.error('Error writing document to collection: ', error)
			})
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				createUser,
				loginUser,
				logoutUser,
				createMerchant,
				uploadMerchantInfo,
				createProduct,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
