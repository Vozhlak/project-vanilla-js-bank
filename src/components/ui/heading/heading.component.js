import ChildComponent from "@/core/component/child.component";
import RenderService from "@/core/services/render.service";

import styles from './heading.module.scss';
import template from './heading.template.html';
import { $R } from "@/core/rquery/rquery.lib";

export class Heading extends ChildComponent {
  constructor(title) {
    super();
    this.title = title;
  }


  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    $R(this.element).text(this.title)

    return this.element;
  }
}