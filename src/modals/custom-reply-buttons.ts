/*
This file is part of Needle.

Needle is free software: you can redistribute it and/or modify it under the terms of the GNU
Affero General Public License as published by the Free Software Foundation, either version 3 of
the License, or (at your option) any later version.

Needle is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with Needle.
If not, see <https://www.gnu.org/licenses/>.
*/

import {
	ActionRowBuilder,
	type ModalActionRowComponentBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import NeedleModal from "../models/NeedleModal.js";

export default class CustomReplyButtonsModal extends NeedleModal {
	public customId = "custom-reply-buttons";
	public get builder(): ModalBuilder {
		const closeText = this.getTextInput("Close");
		const closeStyle = this.getStyleInput("Close", "Green");
		const titleText = this.getTextInput("Title");
		const titleStyle = this.getStyleInput("Title", "Blurple");

		return new ModalBuilder()
			.setCustomId(this.customId)
			.setTitle("Set custom buttons")
			.setComponents(
				this.makeRow(closeText),
				this.makeRow(closeStyle),
				this.makeRow(titleText),
				this.makeRow(titleStyle)
			);
	}

	public async submit(): Promise<void> {
		// Not used, we only use openAndAwaitSubmit on this modal
	}

	private makeRow(input: TextInputBuilder): ActionRowBuilder<ModalActionRowComponentBuilder> {
		return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(input);
	}

	private getTextInput(name: string): TextInputBuilder {
		return new TextInputBuilder()
			.setCustomId(name.toLowerCase() + "Text")
			.setLabel(name + " button text (empty = hidden)")
			.setRequired(false)
			.setPlaceholder("Hidden")
			.setStyle(TextInputStyle.Short)
			.setMaxLength(80);
	}

	private getStyleInput(name: string, placeholder: string): TextInputBuilder {
		return new TextInputBuilder()
			.setCustomId(name.toLowerCase() + "Style")
			.setLabel(name + " button style (blurple/grey/green/red)")
			.setRequired(true)
			.setPlaceholder(placeholder.toUpperCase())
			.setStyle(TextInputStyle.Short)
			.setMinLength("red".length)
			.setMaxLength("blurple".length);
	}
}
