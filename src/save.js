/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { Card } from "@wordpress/components";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const {
		title,
		titleTag,
		trialDays,
		amount,
		toggleDeal,
		description,
		symbol,
		selectSize,
		headerColor,
		backgroundImage
	} = attributes;
	
	return (
		<div className="parent" 
			style={ {
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition:"center",
				backgroundRepeat:"no-repeat"
			} }
		>
		<div className="price-table-container">
			{toggleDeal&&<div className="price-table-deals">Best Deal</div>}
			<div
				style={{ backgroundColor: headerColor }}
				className="price-table-header"
			>
				<RichText.Content tagName={titleTag} value={title} />

				<RichText.Content
					tagName="span"
					className="price-table-days"
					value={trialDays}
					style={{ textAlign: "center" }}
				/>
				<h2 style={{ fontSize: selectSize }}>{symbol + amount}</h2>

			</div>
			<div className="price-table-body">
				<RichText.Content tagName="p" value={description} />
			</div>
			<InnerBlocks.Content />
		</div>
		</div>
	);
}