/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { TextControl, PanelBody, ColorPalette, ToggleControl, Button } from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, InspectorControls, RichText, MediaUpload } from '@wordpress/block-editor';
import './editor.scss';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import { MyFontSizePicker } from "./fontPicker";

const ALLOWED_BLOCKS = ["core/button"];
const ALLOWED_MEDIA_TYPES = [ 'image' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		titleTag,
		toggleDeal,
		trialDays,
		amount,
		description,
		symbol,
		selectSize,
		headerColor,
		backgroundImage,
		toggleDealData
	} = attributes;

	function onselectImage(newImage) {
		setAttributes( { backgroundImage: newImage.sizes.full.url} )
	}

	return [
		<InspectorControls style={{ marginBottom: "40px" }}>
			<PanelBody title="Background Image Settings">
			<MediaUpload 
				onSelect={ onselectImage }
				value={ backgroundImage }
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				render={ ( { open } ) => (
					<Button onClick={ open }>Select Background Image</Button>
				) }
			/>
			</PanelBody>
			<PanelBody title="Price Settings">
				<TextControl
					label="Price Symbol"
					value={symbol ? symbol : ""}
					onChange={(newSymbol) => setAttributes({ symbol: newSymbol })}
				/>
				<TextControl
					label="Price"
					value={amount}
					onChange={(newAmount) => setAttributes({ amount: newAmount })}
				/>
			</PanelBody>
			<PanelBody title={"Typography"}>
				<MyFontSizePicker
					fontSize={selectSize}
					onChangeFontSize={(newSize) => setAttributes({ selectSize: newSize })}
				/>
				<ToggleGroupControl
					__nextHasNoMarginBottom
					isBlock
					value={titleTag}
					label="Select Title Tag"
					onChange={(value) => setAttributes({ titleTag: value })}
				>
					<ToggleGroupControlOption label="H1" value="h1" />
					<ToggleGroupControlOption label="H2" value="h2" />
					<ToggleGroupControlOption label="H3" value="h3" />
					<ToggleGroupControlOption label="H4" value="h4" />
				</ToggleGroupControl>
			</PanelBody>
		{/* 	<PanelBody title={"Background Color Settings"}>
				<p>
					<strong>Select header background color:</strong>
				</p>
				<ColorPalette
					value={headerColor}
					onChange={(newheaderColor) =>
						setAttributes({ headerColor: newheaderColor })
					}
				/>
			</PanelBody>	
			*/}	
			<PanelBody title={"Best Deal Settings"}>
  			<ToggleControl
    			checked={toggleDeal}
    			label="Enable Best Deal"
    			onChange={() => setAttributes({ toggleDeal: !toggleDeal })}
 			/>
  			{toggleDeal && (
    			<TextControl 
      				label="Best Deal Title"
      				value={toggleDealData}
      				onChange={(newData) => setAttributes({ toggleDealData: newData })}
    			/>
  			)}
			</PanelBody>

		</InspectorControls>,
		<div className="parent"
		style={ {
			backgroundImage: `url(${backgroundImage})`,
			backgroundSize: "50%",
			backgroundPosition:"center",
			backgroundRepeat:"no-repeat"
		} }>
			<div className="price-table-container">			
			{toggleDeal && <div className="price-table-deals">{`${toggleDealData}`}</div>}
			 	<div
					style={{ backgroundColor: headerColor }}
					className="price-table-header"
				>	
					<RichText
						key="editable"
						tagName={titleTag}
						placeholder="card title"
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
					/>
					<RichText
						key="editable"
						tagName="span"
						className="price-table-days"
						placeholder="trial days"
						value={trialDays}
						style={{ textAlign: "center" }}
						onChange={(value) => setAttributes({ trialDays: value })}
					/>
					<h2 style={{ fontSize: selectSize }}>{symbol + amount}</h2>
				</div>
				<div className="price-table-body">
					<RichText
						key="editable"
						tagName="p"
						placeholder="add description"
						value={description}
						onChange={(newDes) => setAttributes({ description: newDes })}
					/>
				</div>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
			</div>
		</div>,
	];
}
