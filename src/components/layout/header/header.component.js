import ChildComponent from "@/core/component/child.component";
import RenderService from "@/core/services/render.service";

import styles from './header.module.scss';
import template from './header.template.html';
import { Logo } from "./logo/logo.component";
import { UserItem } from "@/components/ui/user-item/user-item.component";
import { Search } from "./search/search.component";
import { LogoutButton } from "./logout-button/logout-button.component";
import { Store } from "@/core/store/store";
import { $R } from "@/core/rquery/rquery.lib";

export class Header extends ChildComponent {
  constructor({ router }) {
    super();

    this.store = Store.getInstance();
    this.store.addObserver(this);

    this.router = router;

    this.userItem = new UserItem({
      avatarPath: '/',
      name: 'Mr. Fox'
    })
  }

  update() {
    this.user = this.store.state.user;
    const authSideElement = $R(this.element).find('#auth-side');

    if (this.user) {
      authSideElement.show();
      this.router.navigate('/');
      this.userItem.update(this.user);
    } else {
      authSideElement.hide();
    }
  }

  render() {
    this.element = RenderService.htmlToElement(template, [
      Logo,
      Search,
      this.userItem, 
      new LogoutButton({ router: this.router })
    ], styles);

    this.update();

    return this.element;
  }
}