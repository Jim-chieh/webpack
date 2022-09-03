import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import api from '../../utils/api';
import avater from './Kermit_the_Frog.jpg';

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
const Photo = styled.img`
	width: 250px;
	height: 250px;
	margin-top: 24px;
	border-radius: 50%;
`;

const Content = styled.div`
	margin-top: 24px;
`;

const HandleSigninAndSignupButton = styled.button`
	width: 400px;
	height: 40px;
	margin-top: 24px;
	font-size: 20px;
	font-weight: 700;
	border: 1px solid black;
	border-radius: 10px;
	background-color: rgb(207, 226, 243);
	:hover {
		cursor: pointer;
	}
`;

const LogoutButton = styled(HandleSigninAndSignupButton)`
	:hover {
		cursor: pointer;
	}
`;

const signinOrsignupList = ['Sign in', 'Sign up'];

function Profile() {
	const [profile, setProfile] = useState();
	const [checkSigninOrSignup, setCheckSigninOrSignup] = useState(
		signinOrsignupList[0]
	);
	const [checkSigninOrSignupIndex, setCheckSigninOrSignupIndex] = useState(0);
	let stylishToken = window.localStorage.getItem('stylishToken') || [];
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		// let stylishToken = window.localStorage.getItem('stylishToken');
		async function getProfile() {
			let stylishToken = window.localStorage.getItem('stylishToken');
			if (stylishToken) {
				const { data } = await api.getProfile(stylishToken);
				setProfile(data);
			}
		}
		getProfile();
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

	async function handleSubmit() {
		async function getProfile() {
			const { data } = await api.getProfile(stylishToken);
			setProfile(data);
		}
		if (!emailRef.current.includes('@')) {
			alert('請輸入正確信箱格式!');
			return;
		}
		if (checkSigninOrSignup === 'Sign in') {
			let body = {
				provider: 'native',
				email: emailRef.current,
				password: passwordRef.current
			};
			try {
				const { data } = await api.signin(body);
				stylishToken = data.access_token;
				window.localStorage.setItem('stylishToken', stylishToken);
				getProfile();
				alert('已經您登入!');
				return;
			} catch (e) {
				window.alert(e.message);
				return;
			}
		}
		if (checkSigninOrSignup === 'Sign up') {
			let body = {
				name: nameRef.current,
				email: emailRef.current,
				password: passwordRef.current
			};
			try {
				const { data } = await api.signup(body);
				stylishToken = data.access_token;
				window.localStorage.setItem('stylishToken', stylishToken);
				getProfile();
				alert('已經您登入!');
				return;
			} catch (e) {
				window.alert(e.message);
				return;
			}
		}
	}

	function handleLogout() {
		window.localStorage.removeItem('stylishToken');
		setProfile();
		alert('已將您登出');
	}

	if (profile === undefined)
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
					<HandleSigninAndSignupButton onClick={handleSubmit}>
						{checkSigninOrSignup}
					</HandleSigninAndSignupButton>
				</>
			</Wrapper>
		);

	if (stylishToken.length > 0) {
		return (
			<Wrapper>
				<>
					<Photo src={profile.picture || avater}></Photo>
					<Content>{profile.name}</Content>
					<Content>{profile.email}</Content>
					<LogoutButton onClick={handleLogout}>登出</LogoutButton>
				</>
			</Wrapper>
		);
	}
}

export default Profile;
