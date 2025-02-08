import {Component} from "#html/component";
import {html, type TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";

/**
 * An action bar located under the navigation bar.
 */
@customElement("action-bar")
export class ActionBar extends Component {

	/**
	 * Creates a new action bar.
	 */
	constructor() {
		super({shadowRoot: true});
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	override disconnectedCallback(): void {
		document.documentElement.style.removeProperty("--main-offset");
		super.disconnectedCallback();
	}

	/**
	 * Method invoked after the first rendering.
	 * @returns Resolves when this component has been updated.
	 */
	protected override async firstUpdated(): Promise<void> {
		await this.updateComplete;
		const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--navbar-height"));
		const mainOffset = this.offsetHeight + (Number.isNaN(navbarHeight) ? 0 : navbarHeight);
		document.documentElement.style.setProperty("--main-offset", `${mainOffset}px`);
	}

	/**
	 * Renders this component.
	 * @returns The view template.
	 */
	protected override render(): TemplateResult {
		return html`
			<aside class="container-fluid">
				<slot class="d-flex justify-content-between align-items-center"></slot>
			</aside>
		`;
	}
}
