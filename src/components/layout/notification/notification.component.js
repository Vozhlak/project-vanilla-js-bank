import ChildComponent from "@/core/component/child.component";
import RenderService from "@/core/services/render.service";

import styles from './notification.module.scss';
import template from './notification.template.html';
import { StorageService } from "@/core/services/storage.service";

export class Notification extends ChildComponent {
  render() {
    this.element = RenderService.htmlToElement(template, [], styles);
    document.storageService = new StorageService();
    return this.element;
  }
}