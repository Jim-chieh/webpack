import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import api from '../../utils/api';
import getJwtToken from '../../utils/getJwtToken';

const Wrapper = styled.div`
	width: 500px;
	margin: 30px auto;
	padding: 60px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	border: 1px solid black;
	border-radius: 40px;
`;

const TitleContianer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 400px;
	border: 1px solid black;
	border-radius: 10px;
	overflow: hidden;
`;

const Title = styled.div`
	padding-bottom: 8px;
	padding-top: 8px;
	font-size: 24px;
	font-weight: bold;
	width: 50%;
	background-color: ${props =>
		props.$isActive ? ' rgb(207, 226, 243)' : 'transparent'};
	cursor: pointer;
	& + & {
		border-left: 1px solid black;
	}
`;

const AccountInfoContainer = styled.div`
	width: 400px;
	margin-top: 40px;
	border-top: 1px solid black;
	display: ${props => (props.$display ? 'block' : 'none')};
	padding-top: ${props => (props.$hasPadding ? '64px' : '0')};
`;

const Name = styled.input`
	width: 400px;
	height: 40px;
	margin-top: 24px;
	border-radius: 10px;
	font-size: 16px;
	padding-left: 5px;
	::placeholder {
		font-size: 16px;
		color: rgb(40, 40, 40);
		padding-left: 5px;
	}
`;

const Email = styled.input`
	width: 400px;
	height: 40px;
	margin-top: 24px;
	border-radius: 10px;
	font-size: 16px;
	padding-left: 5px;
	::placeholder {
		font-size: 16px;
		color: rgb(40, 40, 40);
		padding-left: 5px;
	}
`;

const Password = styled.input`
	width: 400px;
	height: 40px;
	margin-top: 24px;
	border-radius: 10px;
	font-size: 16px;
	padding-left: 5px;
	::placeholder {
		font-size: 16px;
		color: rgb(40, 40, 40);
		padding-left: 5px;
	}
`;
// const Photo = styled.img`
// 	margin-top: 24px;
// `;

// const Content = styled.div`
// 	margin-top: 24px;
// `;

const HandleLoginAndLogoutButton = styled.button`
	width: 400px;
	height: 40px;
	margin-top: 24px;
	font-size: 20px;
	font-weight: 700;
	border: 1px solid black;
	border-radius: 10px;
	background-color: rgb(207, 226, 243);
`;

const signinOrsignupList = ['Sign in', 'Sign up'];

function Profile() {
	const [profile, setProfile] = useState();
	const [checkSigninOrSignup, setCheckSigninOrSignup] = useState(
		signinOrsignupList[0]
	);
	const [checkSigninOrSignupIndex, setCheckSigninOrSignupIndex] = useState(0);
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		// async function getProfile() {
		// 	let jwtToken = window.localStorage.getItem('jwtToken');
		// 	if (!jwtToken) {
		// 		try {
		// 			jwtToken = await getJwtToken();
		// 		} catch (e) {
		// 			window.alert(e.message);
		// 			return;
		// 		}
		// 	}
		// 	window.localStorage.setItem('jwtToken', jwtToken);
		// 	const { data } = await api.getProfile(jwtToken);
		// 	setProfile(data);
		// }
		// getProfile();
	}, []);

	function handleNameChage(e) {
		nameRef.current = e.target.value;
	}

	function handleEmailChage(e) {
		emailRef.current = e.target.value;
	}

	function handlePasswordChage(e) {
		passwordRef.current = e.target.value;
	}

	function handleSubmit() {
		console.log(checkSigninOrSignup, 'click');
	}

	return (
		<Wrapper>
			<TitleContianer>
				{signinOrsignupList.map((signinOrsignup, index) => {
					return (
						<Title
							key={index}
							onClick={() => {
								setCheckSigninOrSignup(signinOrsignup);
								setCheckSigninOrSignupIndex(index);
							}}
							$isActive={checkSigninOrSignupIndex === index}
						>
							{signinOrsignup}
						</Title>
					);
				})}
			</TitleContianer>

			<>
				<AccountInfoContainer
					$display={checkSigninOrSignup === 'Sign in'}
					$hasPadding={checkSigninOrSignup === 'Sign in'}
				>
					<Email placeholder="Email" onChange={handleEmailChage}></Email>
					<Password
						placeholder="Password"
						type="password"
						onChange={handlePasswordChage}
					></Password>
				</AccountInfoContainer>
				<AccountInfoContainer $display={checkSigninOrSignup === 'Sign up'}>
					<Name placeholder="Name" onChange={handleNameChage}></Name>
					<Email placeholder="Email" onChange={handleEmailChage}></Email>
					<Password
						placeholder="Password"
						type="password"
						onChange={handlePasswordChage}
					></Password>
				</AccountInfoContainer>
				<HandleLoginAndLogoutButton onClick={handleSubmit}>
					{checkSigninOrSignup}
				</HandleLoginAndLogoutButton>
			</>
		</Wrapper>
	);
}

export default Profile;
