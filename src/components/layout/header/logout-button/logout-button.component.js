import ChildComponent from "@/core/component/child.component";
import RenderService from "@/core/services/render.service";

import styles from './logout-button.module.scss';
import template from './logout-button.template.html';
import { $R } from "@/core/rquery/rquery.lib";
import { Store } from "@/core/store/store";

export class LogoutButton extends ChildComponent {
  constructor({ router }) {
    super();

    this.store = Store.getInstance();
    this.user = this.store.state.user;

    this.router = router;
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);
    $R(this.element).click(() => {
      this.store.logout();
      this.router.navigate('/auth')
    })
    return this.element;
  }
}