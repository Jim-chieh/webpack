import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import add from './add.png';
import minus from './minus.png';

const Option = styled.div`
	display: flex;
	align-items: center;
	margin-top: 30px;
`;

const OptionName = styled.div`
	line-height: 24px;
	font-size: 20px;
	letter-spacing: 4px;
	color: #3f3a3a;

	@media screen and (max-width: 1279px) {
		line-height: 17px;
		font-size: 14px;
		letter-spacing: 2.8px;

		${props => props.hideOnMobile && 'display: none;'}
	}
`;

const Color = styled.div`
	width: 36px;
	height: 36px;
	padding: 6px;
	border: 6px solid white;
	box-shadow: 0px 0px 1px #bbbbbb;
	cursor: pointer;
	margin-left: 21px;
	background-color: ${props => props.$colorCode};
	${props => props.$isSelected && 'outline: 1px solid #979797;'}

	& + & {
		margin-left: 15px;
	}
`;

const Size = styled.div`
	width: 34px;
	height: 34px;
	background-color: ${props => (props.$isSelected ? 'black' : '#ececec')};
	color: ${props => (props.$isSelected ? 'white' : '#3f3a3a')};
	border-radius: 50%;
	font-size: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 22px;
	cursor: ${props => (props.$isDisabled ? ' not-allowed' : 'pointer')};
	${props => props.$isDisabled && 'opacity: 0.25;'}

	& + & {
		margin-left: 20px;
	}
`;

const QuantitySelector = styled.div`
	margin-left: 28px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 160px;
	height: 44px;
	padding: 0 10px;
	border: 1px solid #979797;
	font-size: 20px;

	@media screen and (max-width: 1279px) {
		margin-left: 0;
		width: 100%;
		padding: 0 30px;
	}
`;

const Quantity = styled.div`
	color: #8b572a;
`;

const Button = styled.div`
	cursor: pointer;
	background-size: contain;
	width: 16px;
	height: 16px;
`;

const DecrementButton = styled(Button)`
	background-image: url(${minus});
`;

const IncrementButton = styled(Button)`
	background-image: url(${add});
`;

const AddToCart = styled.button`
	width: 100%;
	height: 60px;
	margin-top: 29px;
	border: solid 1px #979797;
	background-color: black;
	font-size: 20px;
	letter-spacing: 4px;
	color: white;
	cursor: pointer;

	@media screen and (max-width: 1279px) {
		height: 44px;
		margin-top: 10px;
		font-size: 16px;
		letter-spacing: 3.2px;
		color: white;
	}
`;

function ProductVariants({ product }) {
	console.log(product);
	const [selectedColorCode, setSelectedColorCode] = useState(
		product.colors[0].code
	);
	const [selectedColorIndex, setSelectedColorIndex] = useState(0);
	const [selectedSize, setSelectedSize] = useState();
	const [selectedSizeIndex, setSelectSizeIndex] = useState();
	const [quantity, setQuantity] = useState(1);
	const [cartItems, setCartItems] = useOutletContext();
	console.log(selectedColorIndex);

	function getStock(colorCode, size) {
		return product.variants.find(
			variant => variant.color_code === colorCode && variant.size === size
		).stock;
	}

	function getQuantity(colorCode, size) {
		let qty = 0;
		cartItems.forEach(cartItem => {
			if (cartItem.color.code === colorCode && cartItem.size === size) {
				qty += cartItem.qty;
			}
		});
		return qty;
	}

	function addToCart() {
		if (!selectedSize) {
			window.alert('請選擇尺寸');
			return;
		}

		for (let i = 0; i < cartItems.length; i++) {
			if (
				cartItems[i].name === product.title &&
				cartItems[i]['color'].code ===
					product.colors[selectedColorIndex].code &&
				cartItems[i].size === product.sizes[selectedSizeIndex]
			) {
				cartItems[i].qty += quantity;
				alert(`成功將  -${product.title}-  加入購物車`);
				setSelectedSize();
				setQuantity(1);
				window.localStorage.setItem('cartItems', JSON.stringify(cartItems));

				return;
			}
		}
		const newCartItems = [
			...cartItems,
			{
				color: product.colors.find(color => color.code === selectedColorCode),
				id: product.id,
				image: product.main_image,
				name: product.title,
				price: product.price,
				qty: quantity,
				size: selectedSize,
				stock: getStock(selectedColorCode, selectedSize)
			}
		];
		setCartItems(newCartItems);
		window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
		window.alert('已加入商品');
		setSelectedSize();
		setQuantity(1);
	}
	return (
		<>
			<Option>
				<OptionName>顏色｜</OptionName>
				{product.colors.map((color, index) => (
					<Color
						key={color.code}
						$isSelected={color.code === selectedColorCode}
						$colorCode={`#${color.code}`}
						onClick={() => {
							setSelectedColorCode(color.code);
							setSelectedColorIndex(index);
							setSelectedSize();
							setQuantity(1);
						}}
					/>
				))}
			</Option>
			<Option>
				<OptionName>尺寸｜</OptionName>
				{product.sizes.map((size, index) => {
					const stock = getStock(selectedColorCode, size);
					const qty = getQuantity(selectedColorCode, size);
					return (
						<Size
							key={size}
							$isSelected={size === selectedSize}
							$isDisabled={stock - qty <= 0}
							onClick={() => {
								const stock = getStock(selectedColorCode, size);
								if (stock - qty === 0) return;
								setSelectedSize(size);
								setSelectSizeIndex(index);
								if (stock < quantity) setQuantity(1);
							}}
						>
							{size}
						</Size>
					);
				})}
			</Option>
			<Option>
				<OptionName hideOnMobile>數量｜</OptionName>
				<QuantitySelector>
					<DecrementButton
						onClick={() => {
							if (!selectedSize || quantity === 1) return;
							setQuantity(quantity - 1);
						}}
					/>
					<Quantity>{quantity}</Quantity>
					<IncrementButton
						onClick={() => {
							const stock = getStock(selectedColorCode, selectedSize);
							const qty = getQuantity(selectedColorCode, selectedSize);
							if (!selectedSize || quantity >= stock - qty) return;
							setQuantity(quantity + 1);
						}}
					/>
				</QuantitySelector>
			</Option>
			<AddToCart onClick={addToCart}>
				{selectedSize ? '加入購物車' : '請選擇尺寸'}
			</AddToCart>
		</>
	);
}

export default ProductVariants;
